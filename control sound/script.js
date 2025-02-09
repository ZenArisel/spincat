// ตัวแปรที่ใช้ในการเคลื่อนที่ของ GIF
let posX = 0;
let posY = 0;
let moveInterval = null;

// ฟังก์ชันเริ่มการเคลื่อนที่
function startMove(direction) {
    if (moveInterval) return; // หลีกเลี่ยงการเริ่มใหม่หากมีการเคลื่อนไหวอยู่แล้ว

    moveInterval = setInterval(() => {
        moveGif(direction);
    }, 30); // ทุก 30ms

    // แสดง GIF เมื่อกดปุ่ม
    const image = document.getElementById('image');
    const gif = document.getElementById('gif');
    
    image.classList.remove('show');  // ซ่อนรูปภาพ
    gif.classList.add('show');       // แสดง GIF
}

// ฟังก์ชันหยุดการเคลื่อนไหวและเปลี่ยนกลับเป็นรูปภาพ
function stopMoveAndShowImage() {
    clearInterval(moveInterval);
    moveInterval = null;

    // เปลี่ยนกลับเป็นรูปภาพเมื่อปล่อยปุ่ม
    const image = document.getElementById('image');
    const gif = document.getElementById('gif');
    
    gif.classList.remove('show');   // ซ่อน GIF
    image.classList.add('show');    // แสดงรูปภาพ
}

// ฟังก์ชันการเคลื่อนที่ของ GIF และ รูปภาพ
function moveGif(direction) {
    const gif = document.getElementById('gif');
    const moveAmount = 5;  // ขนาดการเคลื่อนไหว

    switch (direction) {
        case 'up':
            posY -= moveAmount;
            break;
        case 'down':
            posY += moveAmount;
            break;
        case 'left':
            posX -= moveAmount;
            break;
        case 'right':
            posX += moveAmount;
            break;
    }

    // ใช้ตำแหน่งเดียวกันในการเคลื่อนที่ของภาพและ GIF
    gif.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px)`;
    const image = document.getElementById('image');
    image.style.transform = `translate(-50%, -50%) translate(${posX}px, ${posY}px)`;
}
