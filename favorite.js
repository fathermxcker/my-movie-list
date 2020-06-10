(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const dataPanel = document.querySelector('#data-panel')

  //從字串轉為 Object
  const movie = JSON.parse(localStorage.getItem(`favoriteMovies`))
  let htmlContent = ''
  displayDataList(movie)

  function displayDataList(data) {
    data.forEach(item => {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>

            <!-- Button trigger modal  dataset solution-->
            <div class="card-footer">
              <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">
                more
              </button>

              <!-- favorite button -->
<button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      `
      dataPanel.innerHTML = htmlContent
    })
  }

  //  1.點擊more 2.modal 彈窗
  dataPanel.addEventListener('click', (event) => {

    // console.log(event.target)
    if (event.target.matches('.btn-show-movie')) {
      const modalTitle = document.querySelector('#show-movie-title')
      const modalImage = document.querySelector('#show-movie-image')
      const modalDate = document.querySelector('#show-movie-date')
      const modalDescription = document.querySelector('#show-movie-description')

      modalTitle.innerHTML = ''
      modalImage.innerHTML = ''
      modalDate.innerHTML = ''
      modalDescription.textContent = ''

      url = INDEX_URL + event.target.dataset.id
      axios.get(url)
        .then((response) => {
          const data = response.data.results
          //render modal
          modalTitle.innerHTML = data.title
          modalImage.innerHTML = `
          <img class="img-fluid" src="${POSTER_URL}${data.image}" alt="Card image cap">
          `
          modalDate.innerHTML = `release at: ${data.release_date}`
          modalDescription.textContent = data.description
        })
        .catch((err) => console.log(err))
    }
  })
})()