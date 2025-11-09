// Chat Room Component JavaScript
class ChatRoom {
  constructor() {
    this.messages = [];
    this.currentUser = null;
    this.unsubscribe = null;
    this.replyingTo = null; // Store the message being replied to
    this.initializeFirebase();
    this.initializeElements();
    this.setupEventListeners();
    // Load messages immediately when component is initialized
    this.loadMessagesOnInit();
    // Initialize typing animation
    this.initTypingAnimation();
  }

  initializeFirebase() {
    // Firebase configuration - sudah dikonfigurasi
    this.firebaseConfig = {
      apiKey: "AIzaSyAUiduYuYK5LyFrXxLO3zr4siO59t5g96s",
      authDomain: "portofolio-a7402.firebaseapp.com",
      projectId: "portofolio-a7402",
      storageBucket: "portofolio-a7402.firebasestorage.app",
      messagingSenderId: "1044287348617",
      appId: "1:1044287348617:web:98c1cc9a1802ee885bcb58",
      measurementId: "G-LLN8ZWR46G",
    };

    // Initialize Firebase (jika belum diinisialisasi)
    if (typeof firebase === "undefined") {
      return;
    }

    try {
      // Use Firebase instance from global scope

      if (window.firebase && window.firebaseApp && window.firebaseDb) {
        this.auth = window.firebase.auth;
        this.db = window.firebaseDb;

        if (this.auth) {
          this.setupAuthStateListener();
        } else {
        }
      } else {
        // Try to wait a bit and check again
        setTimeout(() => {
          if (window.firebase && window.firebaseApp && window.firebaseDb) {
            this.auth = window.firebase.auth;
            this.db = window.firebaseDb;
            this.setupAuthStateListener();
          } else {
          }
        }, 2000);
      }
    } catch (error) {}
  }

  initializeElements() {
    this.chatMessages = document.getElementById("chat-messages");
    this.loadingMessages = document.getElementById("loading-messages");
    this.userInfo = document.getElementById("user-info");
    this.loginSection = document.getElementById("login-section");
    this.messageInputSection = document.getElementById("message-input-section");
    this.googleLoginBtn = document.getElementById("google-login-btn");
    this.logoutBtn = document.getElementById("logout-btn");
    this.messageInput = document.getElementById("message-input");
    this.sendBtn = document.getElementById("send-btn");
    this.userAvatar = document.getElementById("user-avatar");
    this.userName = document.getElementById("user-name");

    // Reply elements
    this.replyPreview = document.getElementById("reply-preview");
    this.replySender = document.getElementById("reply-sender");
    this.replyMessage = document.getElementById("reply-message");
    this.cancelReplyBtn = document.getElementById("cancel-reply-btn");
  }

  setupEventListeners() {
    // Google Login
    if (this.googleLoginBtn) {
      this.googleLoginBtn.addEventListener("click", () =>
        this.signInWithGoogle()
      );
    }

    // Logout
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener("click", () => this.signOut());
    }

    // Send Message
    if (this.sendBtn) {
      this.sendBtn.addEventListener("click", () => this.sendMessage());
    }

    // Enter key to send message
    if (this.messageInput) {
      this.messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      // Disable send button when input is empty
      this.messageInput.addEventListener("input", () => {
        this.updateSendButton();
      });
    }

    // Cancel Reply
    if (this.cancelReplyBtn) {
      this.cancelReplyBtn.addEventListener("click", () => this.cancelReply());
    }
  }

  async loadMessagesOnInit() {
    // Load messages immediately when component initializes
    // This allows visitors to see chat history without logging in
    if (this.db) {
      this.loadMessages();
    } else {
      // Wait for Firebase to initialize and try again
      setTimeout(() => {
        if (this.db) {
          this.loadMessages();
        }
      }, 2000);
    }
  }

  async setupAuthStateListener() {
    if (!this.auth) return;

    try {
      const { onAuthStateChanged } = await import(
        "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"
      );

      onAuthStateChanged(this.auth, (user) => {
        this.currentUser = user;
        this.updateUI();

        // Don't stop listening to messages when user logs out
        // Messages should remain visible for all visitors
        if (user) {
          // User logged in - ensure messages are still loaded
          if (!this.unsubscribe) {
            this.loadMessages();
          }
        }
        // Note: We removed the else block that was clearing messages
        // This allows chat history to remain visible for all visitors
      });
    } catch (error) {}
  }

  async signInWithGoogle() {
    if (!this.auth) {
      return;
    }

    try {
      this.showLoading(this.googleLoginBtn);

      // Import GoogleAuthProvider from the module
      const { GoogleAuthProvider, signInWithPopup } = await import(
        "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"
      );

      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");

      const result = await signInWithPopup(this.auth, provider);
    } catch (error) {
      // Show more specific error messages
      let errorMessage = "Gagal login dengan Google. Silakan coba lagi.";

      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login dibatalkan oleh user. Silakan coba lagi.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage =
          "Popup diblokir oleh browser. Silakan izinkan popup dan coba lagi.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage =
          "Koneksi internet bermasalah. Silakan cek koneksi dan coba lagi.";
      } else if (error.code === "auth/unauthorized-domain") {
        errorMessage = "Domain tidak diizinkan. Silakan hubungi administrator.";
      }

      this.showError(errorMessage);
    } finally {
      this.hideLoading(this.googleLoginBtn);
    }
  }

  async signOut() {
    if (!this.auth) return;

    try {
      const { signOut } = await import(
        "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"
      );
      await signOut(this.auth);
    } catch (error) {
      this.showError("Gagal logout. Silakan coba lagi.");
    }
  }

  updateUI() {
    if (this.currentUser) {
      // User is logged in
      this.userInfo.style.display = "flex";
      this.loginSection.style.display = "none";
      this.messageInputSection.style.display = "block";

      // Update user info
      this.userAvatar.src =
        this.currentUser.photoURL || "https://via.placeholder.com/32";
      this.userName.textContent = this.currentUser.displayName || "User";

      // Enable message input
      this.messageInput.disabled = false;
    } else {
      // User is not logged in
      this.userInfo.style.display = "none";
      this.loginSection.style.display = "block";
      this.messageInputSection.style.display = "none";
    }
  }

  async sendMessage() {
    if (!this.currentUser || !this.db) return;

    const messageText = this.messageInput.value.trim();
    if (!messageText) return;

    try {
      this.sendBtn.disabled = true;
      this.sendBtn.innerHTML = '<div class="loading"></div>';

      const message = {
        text: messageText,
        sender: this.currentUser.displayName || "User",
        senderId: this.currentUser.uid,
        avatar: this.currentUser.photoURL || "https://via.placeholder.com/40",
        timestamp: window.firebase.firestore.FieldValue.serverTimestamp(),
        // Add reply information if replying to a message
        ...(this.replyingTo && {
          replyTo: {
            messageId: this.replyingTo.id,
            sender: this.replyingTo.sender,
            text: this.replyingTo.text,
            timestamp: this.replyingTo.timestamp,
          },
        }),
      };

      const { collection, addDoc } = await import(
        "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"
      );
      await addDoc(collection(this.db, "messages"), message);

      this.messageInput.value = "";
      this.cancelReply(); // Clear reply after sending
      this.updateSendButton();
    } catch (error) {
      // Show more specific error messages
      let errorMessage = "Gagal mengirim pesan. Silakan coba lagi.";

      if (error.code === "permission-denied") {
        errorMessage =
          "Tidak memiliki izin untuk mengirim pesan. Pastikan Firestore Rules sudah dikonfigurasi dengan benar.";
      } else if (error.code === "unavailable") {
        errorMessage = "Database tidak tersedia. Silakan cek koneksi internet.";
      } else if (error.code === "unauthenticated") {
        errorMessage = "Sesi login telah berakhir. Silakan login ulang.";
      }

      this.showError(errorMessage);
    } finally {
      this.sendBtn.disabled = false;
      this.sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
  }

  async loadMessages() {
    if (!this.db) return;

    // Don't load messages if already listening
    if (this.unsubscribe) return;

    try {
      const { collection, query, orderBy, onSnapshot } = await import(
        "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"
      );

      const messagesQuery = query(
        collection(this.db, "messages"),
        orderBy("timestamp", "asc")
      );

      this.unsubscribe = onSnapshot(
        messagesQuery,
        (snapshot) => {
          this.messages = [];
          snapshot.forEach((doc) => {
            const message = { id: doc.id, ...doc.data() };
            this.messages.push(message);
          });
          this.renderMessages();
        },
        (error) => {
          // Show more specific error messages
          let errorMessage = "Gagal memuat pesan.";

          if (error.code === "permission-denied") {
            errorMessage =
              "Tidak memiliki izin untuk membaca pesan. Pastikan Firestore Rules sudah dikonfigurasi dengan benar.";
          } else if (error.code === "unavailable") {
            errorMessage =
              "Database tidak tersedia. Silakan cek koneksi internet.";
          } else if (error.code === "unauthenticated") {
            errorMessage = "Sesi login telah berakhir. Silakan login ulang.";
          }

          this.showError(errorMessage);
        }
      );
    } catch (error) {
      this.showError("Gagal memuat pesan.");
    }
  }

  stopListeningToMessages() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  // Method to manually stop listening (only used when component is destroyed)
  destroy() {
    this.stopListeningToMessages();
  }

  renderMessages() {
    if (!this.chatMessages) return;

    // Hide loading indicator
    if (this.loadingMessages) {
      this.loadingMessages.style.display = "none";
    }

    if (this.messages.length === 0) {
      this.chatMessages.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-comments"></i>
          <p>Belum ada pesan. Jadilah yang pertama mengirim pesan!</p>
        </div>
      `;
      return;
    }

    this.chatMessages.innerHTML = this.messages
      .map((message) => {
        const time = message.timestamp
          ? this.formatTime(message.timestamp.toDate())
          : "Baru saja";

        // Generate reply section if message has replyTo
        const replySection = message.replyTo
          ? `
          <div class="message-reply">
            <div class="reply-header">
              <i class="fas fa-reply reply-icon"></i>
              <span class="reply-to-sender">${this.escapeHtml(
                message.replyTo.sender
              )}</span>
            </div>
            <div class="reply-content">${this.escapeHtml(
              message.replyTo.text
            )}</div>
          </div>
        `
          : "";

        return `
        <div class="message" data-message-id="${message.id}">
          <img src="${message.avatar}" alt="${
          message.sender
        }" class="message-avatar">
          <div class="message-content">
            <div class="message-header">
              <span class="message-sender">${this.escapeHtml(
                message.sender
              )}</span>
              <span class="message-time">${time}</span>
              ${
                this.currentUser
                  ? `<button class="reply-btn" onclick="window.chatRoom.replyToMessage('${message.id}')">
                <i class="fas fa-reply"></i>
              </button>`
                  : ""
              }
            </div>
            ${replySection}
            <div class="message-text">${this.escapeHtml(message.text)}</div>
          </div>
        </div>
      `;
      })
      .join("");

    // Scroll to bottom
    this.scrollToBottom();
  }

  // clearMessages() method removed - we want to keep messages visible for all visitors

  updateSendButton() {
    if (!this.sendBtn || !this.messageInput) return;

    const hasText = this.messageInput.value.trim().length > 0;
    this.sendBtn.disabled = !hasText || !this.currentUser;
  }

  scrollToBottom() {
    if (this.chatMessages) {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
  }

  formatTime(date) {
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) {
      // Less than 1 minute
      return "Baru saja";
    } else if (diff < 3600000) {
      // Less than 1 hour
      const minutes = Math.floor(diff / 60000);
      return `${minutes} menit yang lalu`;
    } else if (diff < 86400000) {
      // Less than 1 day
      const hours = Math.floor(diff / 3600000);
      return `${hours} jam yang lalu`;
    } else {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  showLoading(element) {
    if (element) {
      element.disabled = true;
      element.innerHTML = '<div class="loading"></div>';
    }
  }

  hideLoading(element, originalText = "Login dengan Google") {
    if (element) {
      element.disabled = false;
      element.innerHTML = originalText;
    }
  }

  showError(message) {
    // Simple error notification
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-notification";
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 107, 107, 0.9);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      backdrop-filter: blur(10px);
      max-width: 400px;
      word-wrap: break-word;
    `;
    errorDiv.textContent = message;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 8000); // Increase timeout to 8 seconds for longer messages
  }

  // Method untuk mengupdate konfigurasi Firebase
  updateFirebaseConfig(config) {
    this.firebaseConfig = config;
    // Reinitialize Firebase dengan konfigurasi baru
    this.initializeFirebase();
  }

  // Reply functionality
  replyToMessage(messageId) {
    if (!this.currentUser) return;

    const message = this.messages.find((msg) => msg.id === messageId);
    if (!message) return;

    this.replyingTo = message;
    this.showReplyPreview();
  }

  showReplyPreview() {
    if (!this.replyingTo || !this.replyPreview) return;

    this.replySender.textContent = this.replyingTo.sender;
    this.replyMessage.textContent = this.replyingTo.text;
    this.replyPreview.style.display = "block";

    // Focus on input
    this.messageInput.focus();
  }

  cancelReply() {
    this.replyingTo = null;
    if (this.replyPreview) {
      this.replyPreview.style.display = "none";
    }
  }

  // Method untuk efek typing animation (sekali saja)
  initTypingAnimation() {
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;

    const text =
      "JOIN THE DISCUSSION AND SHARE EXPERIENCES WITH OTHER VISITORS";
    let index = 0;

    // Set data-text attribute for glitch effect
    typingText.setAttribute("data-text", text);

    const typeWriter = () => {
      // Typing effect
      const currentText = text.substring(0, index + 1);
      typingText.textContent = currentText;
      index++;

      if (index < text.length) {
        setTimeout(typeWriter, 100); // Typing speed
      } else {
        // Animation selesai, hilangkan cursor setelah 2 detik
        setTimeout(() => {
          const cursor = document.querySelector(".typing-cursor");
          if (cursor) {
            cursor.style.display = "none";
          }
        }, 2000);
      }
    };

    // Start the animation after a short delay
    setTimeout(typeWriter, 1000);
  }
}

// Initialize Chat Room when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.chatRoom = new ChatRoom();
});

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = ChatRoom;
}
