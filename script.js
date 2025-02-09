let posX = 0;
let posY = 0;
let moveInterval = null;
let isMoving = false;  // ตัวแปรเช็คสถานะการเคลื่อนไหว
let audio = new Audio('sound.mp3');  // โหลดเสียง
let audioPlaying = false;  // ตัวแปรเช็คสถานะการเล่นเสียง

// ฟังก์ชันเริ่มการเคลื่อนที่
function startMove(direction) {
    if (isMoving) return; // ถ้ากำลังเคลื่อนไหวแล้ว ให้ไม่เริ่มใหม่

    moveInterval = setInterval(() => {
        moveGif(direction);
    }, 30); // ทุก 30ms

    // แสดง GIF เมื่อกดปุ่ม
    const image = document.getElementById('image');
    const gif = document.getElementById('gif');
    
    image.classList.remove('show');  // ซ่อนรูปภาพ
    gif.classList.add('show');       // แสดง GIF

    isMoving = true;  // ตั้งค่าสถานะการเคลื่อนไหว

    // เล่นเสียงเมื่อกดปุ่ม
    if (!audioPlaying) {
        audio.currentTime = 0;  // ตั้งค่าให้เสียงเริ่มจากต้น
        audio.loop = true;  // ตั้งให้เสียงวนซ้ำ
        audio.play();  // เล่นเสียง
        audioPlaying = true;  // ตั้งสถานะการเล่นเสียงเป็น true
    }
}

// ฟังก์ชันหยุดการเคลื่อนที่และเปลี่ยนกลับเป็นรูปภาพ
function stopMoveAndShowImage() {
    clearInterval(moveInterval);
    moveInterval = null;

    // เปลี่ยนกลับเป็นรูปภาพเมื่อปล่อยปุ่ม
    const image = document.getElementById('image');
    const gif = document.getElementById('gif');
    
    gif.classList.remove('show');   // ซ่อน GIF
    image.classList.add('show');    // แสดงรูปภาพ

    isMoving = false;  // ตั้งค่าสถานะการเคลื่อนไหวเป็น false

    // หยุดเสียงเมื่อปล่อยปุ่ม
    if (audioPlaying) {
        audio.pause();  // หยุดเสียง
        audio.currentTime = 0;  // รีเซ็ตตำแหน่งเสียง
        audioPlaying = false;  // ตั้งสถานะการเล่นเสียงเป็น false
    }
}

// ฟังก์ชันการเคลื่อนที่ของ GIF และ รูปภาพ
function moveGif(direction) {
    const gif = document.getElementById('gif');
    const moveAmount = 5;  // ขนาดการเคลื่อนไหว
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const gifRect = gif.getBoundingClientRect();

    // ตรวจสอบการเคลื่อนไหวไม่ให้เกินขอบ
    switch (direction) {
        case 'up':
            if (gifRect.top > containerRect.top) posY -= moveAmount; // หากไม่เกินขอบบน
            break;
        case 'down':
            if (gifRect.bottom < containerRect.bottom) posY += moveAmount; // หากไม่เกินขอบล่าง
            break;
        case 'left':
            if (gifRect.left > containerRect.left) posX -= moveAmount; // หากไม่เกินขอบซ้าย
            break;
        case 'right':
            if (gifRect.right < containerRect.right) posX += moveAmount; // หากไม่เกินขอบขวา
            break;
    }

    // อัปเดตตำแหน่งการเคลื่อนที่ของ GIF และ รูปภาพ
    gif.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px)`;
    const image = document.getElementById('image');
    image.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px)`;
}

// ฟังก์ชันสำหรับหยุดการเคลื่อนไหวเมื่อปล่อยปุ่ม
document.addEventListener('mouseup', stopMoveAndShowImage);  // เมาส์
document.addEventListener('touchend', stopMoveAndShowImage);  // มือถือ

// ป้องกันเมนูคลิกขวา
document.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // ป้องกันการแสดงเมนูคลิกขวา
});

// ป้องกันการกด Ctrl+C หรือ Cmd+C
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'C') || event.metaKey && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault(); // ป้องกันการคัดลอกข้อความ
    }
});
