document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    // Configuration variables
    const words = ['Akash', 'Tharu', 'Akash', 'Tharu', 'Akash', 'Tharu', 'Portfolio', 'CSS', 'HTML', 'Akash', 'Tharu', 'JavaScript', 'Code', 'Developer'];
    const colors = ['#00ff00', '#ff0000', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Various colors for the words
    const numberOfParticles = 150; // Number of particles
    const maxSpeed = 3; // Maximum speed of particles
    const minSpeed = 1; // Minimum speed of particles
    const minSize = 20; // Minimum size of particles
    const maxSize = 14; // Maximum size of particles
    const minRotationSpeed = -0.05; // Minimum rotation speed
    const maxRotationSpeed = 0.05;  // Maximum rotation speed

    // Resize canvas to fill the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas); // Adjust canvas size on window resize

    // Create a new particle with a word, random position, speed, color, size, and rotation
    function createParticle(word) {
        const side = Math.floor(Math.random() * 4); // Randomly choose a side to come from
        let x, y, speedX, speedY;

        switch (side) {
            case 0: // Top
                x = Math.random() * canvas.width;
                y = -Math.random() * canvas.height;
                speedX = Math.random() * 2 - 1;
                speedY = Math.random() * (maxSpeed - minSpeed) + minSpeed;
                break;
            case 1: // Right
                x = canvas.width + Math.random() * canvas.width;
                y = Math.random() * canvas.height;
                speedX = -Math.random() * (maxSpeed - minSpeed) - minSpeed;
                speedY = Math.random() * 2 - 1;
                break;
            case 2: // Bottom
                x = Math.random() * canvas.width;
                y = canvas.height + Math.random() * canvas.height;
                speedX = Math.random() * 2 - 1;
                speedY = -Math.random() * (maxSpeed - minSpeed) - minSpeed;
                break;
            case 3: // Left
                x = -Math.random() * canvas.width;
                y = Math.random() * canvas.height;
                speedX = Math.random() * (maxSpeed - minSpeed) + minSpeed;
                speedY = Math.random() * 2 - 1;
                break;
        }

        return {
            word: word,
            x: x,
            y: y,
            speedX: speedX,
            speedY: speedY,
            rotation: Math.random() * 2 * Math.PI, // Initial rotation angle
            rotationSpeed: Math.random() * (maxRotationSpeed - minRotationSpeed) + minRotationSpeed, // Rotation speed
            color: colors[Math.floor(Math.random() * colors.length)], // Random color
            size: Math.random() * (maxSize - minSize) + minSize // Random font size
        };
    }

    // Initialize particles with random words
    let particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(createParticle(words[Math.floor(Math.random() * words.length)]));
    }

    // Draw and update particles on the canvas
    function drawParticles() {
        // Create a gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#001000'); // Dark green
        gradient.addColorStop(0.5, '#004400'); // Darker green
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with gradient background

        particles.forEach(particle => {
            ctx.fillStyle = particle.color; // Set the color for the word
            ctx.font = `${particle.size}px Arial`; // Set the font size

            // Save the current context state
            ctx.save();

            // Translate and rotate the context to draw text at different angles
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation); // Rotate the context to draw text at different angles
            ctx.fillText(particle.word, 0, 0); // Draw the word

            // Restore the context to its original state
            ctx.restore();

            // Update the particle's position
            particle.x += particle.speedX; // Move horizontally
            particle.y += particle.speedY; // Move vertically
            particle.rotation += particle.rotationSpeed; // Update rotation

            // Reset particle position when it goes off-screen
            if (particle.x > canvas.width || particle.x < -particle.size) {
                particle.x = Math.random() * canvas.width; // Reset to a random horizontal position
                particle.y = Math.random() * canvas.height; // Reset to a random vertical position
                particle.rotation = Math.random() * 2 * Math.PI; // Random rotation
            }
            if (particle.y > canvas.height || particle.y < -particle.size) {
                particle.x = Math.random() * canvas.width; // Reset to a random horizontal position
                particle.y = Math.random() * canvas.height; // Reset to a random vertical position
                particle.rotation = Math.random() * 2 * Math.PI; // Random rotation
            }
        });

        requestAnimationFrame(drawParticles); // Keep animating
    }
    drawParticles(); // Start animation immediately
});
