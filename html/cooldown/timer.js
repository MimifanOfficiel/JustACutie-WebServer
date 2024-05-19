document.addEventListener('DOMContentLoaded', () => {
    function fetchCooldown(endpoint, timerId) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                let remainingTime = data.diff;

                function updateTimer() {
                    const timer = document.getElementById(timerId);
                    
                    if (remainingTime <= 0) {
                        timer.innerHTML = "00:00:00";
                        setTimeout(() => window.location.reload(true), 5000); // Refresh after 5 seconds
                        return;
                    }
                    
                    remainingTime -= 1000;

                    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                    timer.innerHTML = 
                        hours.toString().padStart(2, '0') + ":" +
                        minutes.toString().padStart(2, '0') + ":" +
                        seconds.toString().padStart(2, '0');
                }

                setInterval(updateTimer, 1000);
            });
    }

    fetchCooldown('/getPopupCooldown', 'popup-timer');
    fetchCooldown('/getWallpaperCooldown', 'wallpaper-timer');
});
