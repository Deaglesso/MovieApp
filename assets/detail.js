var id = window.location.search.slice(4)
var box = document.getElementById("details");

axios.get(`https://api.tvmaze.com/shows/${id}`).then((response) => 
{
    const show = response.data;
    box.innerHTML = 
    `
    <h2 class="title">${show.name}</h2>
        <div class="details-box">
            <div class="box">
                <p><strong>Type:</strong> ${show.type}</p>
                <p><strong>Language:</strong> ${show.language}</p>
                <p><strong>Genres:</strong> ${show.genres.join(', ')}</p>
                <p><strong>Status:</strong> ${show.status}</p>
                <p><strong>Runtime:</strong> ${show.runtime} minutes</p>
                <p><strong>Premiered:</strong> ${show.premiered}</p>
                <p><strong>Official Site:</strong> <a href="${show.officialSite}" target="_blank">${show.officialSite}</a></p>
                <p><strong>Network:</strong> ${show.network.name} (${show.network.country.name})</p>
                <p><strong>Rating:</strong> ${show.rating.average}</p>
                <p>${show.summary}</p>
                <p><strong>Seasons:</strong> ${show.seasons || 'N/A'}</p>
                <p><strong>Episodes:</strong> ${show.episodes || 'N/A'}</p>
                <p><strong>Schedule:</strong> ${show.schedule ? show.schedule.days.join(', ') + ' at ' + show.schedule.time : 'N/A'}</p>
                <p><strong>Web Channel:</strong> ${show.webChannel ? show.webChannel.name : 'N/A'}</p>
                <p><strong>Externals: </strong>${
                    show.externals && show.externals.imdb
                        ? `<a href="https://www.imdb.com/title/${show.externals.imdb}" target="_blank">IMDb Page</a>`
                        : 'N/A'
                }</p>
                
                
            </div>
            
            <img src="${show.image.original}" alt="${show.name}"/>
        </div>

    `


})