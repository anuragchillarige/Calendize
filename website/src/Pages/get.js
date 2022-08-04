
const get = () => {
    fetch("http://rss.cnn.com/rss/cnn_world.rss", {
        mode: 'no-cors'
    })
        .catch(() => { alert("Bhavan") })
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            console.log();
            const items = data.querySelectorAll("item");
            items.forEach(el => {
                console.log(el.querySelector("title").innerHTML);
            });
        });
};

export {
    get
};