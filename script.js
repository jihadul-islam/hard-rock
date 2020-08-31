const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
//api
const apiURL = 'https://api.lyrics.ovh'

//search by  song or artist 
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
  
    showData(data);
  }
  //show song and artist in dom

// Show song and artist in DOM
function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          song => `<div class="single-result row align-items-center my-3 p-3">
          <div  class="col-md-9">
          <h3>${song.artist.name}</h3><p>${song.title}</p>
          </div>
      <div class="col-md-3 text-md-right text-center">
      <button class="btn btn-success" id="get-lyrics" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </div>
      
    </div>`
        )
        .join('')}
    </ul>
  `;
  // document.getElementById('title').innerText = song.artist.name;
  // document.getElementById('get_lyrics').innerText = song.artist.name == song.title

  
    more.innerHTML = '';
  }





// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

   if (data.error) {
        result.innerHTML = data.error;
   } else {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

        result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;
  }
}

 


// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});