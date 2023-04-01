document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)

  const url = `https://api.nasa.gov/planetary/apod?api_key=2TUpFwvexGXVTgA99baW3YYpE5quhhVmggm9c2FA&date=${choice}`
  
  const img = document.querySelector('img');
  const iframe = document.querySelector('iframe');
  const p = document.querySelector('p');
  
  img.style.display = 'block'; 
  iframe.style.display = 'none'
  p.style.display = 'block';

  if (!choice) {
    document.querySelector('p').innerText = 'Please select a date that is not in the future.'
  } else {
    fetch(url)
      .then(res => {
        if (res.status === 400) {
          throw new Error("Invalid date selected.");
        }
        return res.json();
      }) // parse response as JSON
      .then(data => {
        console.log(data);
        if (data.media_type === "video") {
          img.style.display = "none";
          iframe.style.display = "block";
          iframe.src = data.url;
        } else {
          iframe.style.display = "none";
          img.style.display = "block";
          img.src = data.url;
        }
        document.querySelector("img").src = data.url;
        document.querySelector("iframe").src = data.url;
        document.querySelector("p").innerText = data.explanation;
      })
      .catch(err => {
        console.log(`error ${err}`);
        document.querySelector("p").innerText = "Please select a valid date";
      });
    }}