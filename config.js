// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
  // Tên người ấy (sẽ hiện trên tiêu đề)
  valentineName: "Chúc Mieee",

  // Tiêu đề trên tab trình duyệt
  pageTitle: "Làm Cục Dàng của anh nha? 💝",

  // Các icon bay bay nền (có thể thêm bớt tùy thích)
  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓", "😍"],
    bears: ["🧸", "🐻", "🌹", "✨"],
  },

  // Câu hỏi và trả lời
  questions: {
    first: {
      text: "Bé có yêu anh hông?",
      yesBtn: "Dạ có ❤️",
      noBtn: "Hông 🥺",
      secretAnswer: "Hông yêu... mà là THƯƠNG lắm lắm! ❤️",
    },
    second: {
      text: "Yêu nhiều hông dạ?",
      startText: "Nhiêu đây nè!",
      nextBtn: "Tiếp theo ❤️",
    },
    third: {
      text: "Vậy... đi cùng anh đến cuối đời nha? (14/02/2026) 🌹",
      yesBtn: "Đồng ý lun!",
      noBtn: "Để suy nghĩ...",
    },
  },

  // Tin nhắn ở Love Meter (thanh đo tình yêu)
  loveMessages: {
    extreme: "TRỜI ƠI! Yêu anh dữ thần vậy hả?? 🥰🚀💝",
    high: "Yêu tới vô cực lunnn! 🚀💝",
    normal: "Yêu nhiều nhiều lắm! 🥰",
  },

  // Tin nhắn chúc mừng khi bấm "Yes"
  celebration: {
    title: "Yayy! Anh biết mà! Yêu vợ nhiều lắm lắm! 🎉💝💖",
    message:
      "Cảm ơn bé đã đến bên anh. Valentine vui vẻ nha tình yêu của anh! 😘",
    emojis: "🎁💖🤗💝💋❤️💕",
  },

  // Màu sắc giao diện
  colors: {
    backgroundStart: "#ffe0f0",
    backgroundEnd: "#ffd4e5",
    buttonBackground: "#ff1744",
    buttonHover: "#ff5252",
    textColor: "#c2185b",
  },

  // Cấu hình hiệu ứng động
  animations: {
    floatDuration: "15s",
    floatDistance: "50px",
    bounceSpeed: "0.5s",
    heartExplosionSize: 1.5,
  },

  // Nhạc nền
  music: {
    enabled: true,
    autoplay: true,
    musicUrl: "Beautiful in white.mp3",
    startText: "🎵 Bật nhạc",
    stopText: "🔇 Tắt nhạc",
    volume: 0.5,
  },
};

window.VALENTINE_CONFIG = CONFIG;
