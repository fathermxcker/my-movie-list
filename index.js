(function () {
  // write your code here
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = [] // 因為 data 不應該是會變動的固定資料，所以用 const

  const dataPanel = document.querySelector('#data-panel')


  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results) //展開運算子...把陣列元素展開
      // console.log(data)
      displayDataList(data)
    })
    .catch((err) => console.log(err))


  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {

      // console.log(POSTER_URL + item.image)
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


    dataPanel.addEventListener('click', (event) => {
      if (event.target.matches('.btn-show-movie')) {
        //catch specific dataset id at line34
        console.log(event.target.dataset.id)

        //get detail
        showMoive(event.target.dataset.id)
      } else if (event.target.matches('.btn-add-favorite')) {
        addFavoriteItem(event.target.dataset.id)
      }
    })
  }

  function showMoive(id) {

    const modalTitle = document.querySelector('#show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')

    const url = INDEX_URL + id
    axios.get(url)
      .then((response) => {
        const data = response.data.results

        modalTitle.textContent = data.title
        modalImage.innerHTML = `
            <img class="img-fluid" src="${POSTER_URL}${data.image}" alt="Card image cap">
            `
        modalDate.textContent = `release at: ${data.release_date}`
        modalDescription.textContent = data.description
      })
      .catch((err) => console.log(err))
  }


  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')

  // listen to search form submit event
  searchForm.addEventListener('submit', event => {
    event.preventDefault()

    //toLowerCase() filter, includes
    let input = searchInput.value.toLowerCase()
    let reuslts = data.filter(
      movie => movie.title.toLowerCase().includes(input)
    )
    console.log(reuslts)
    displayDataList(reuslts)
  })

  function addFavoriteItem(id) {
    //如果找不到東西 就得到空的陣列
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []

    // data 總表查第一個符合的 object
    const movie = data.find(item => item.id === Number(id))

    // 重複加入最愛的處理, some 有部分符合就為 true
    if (list.some(item => (item.id === Number(id)))) {
      alert(`${movie.title} is already in your favorite list.`)
    } else {
      list.push(movie)
      alert(`Added ${movie.title} to your favorite list!`)
    }
    //localstorage 存入 key:value 必須為字串
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
  }

})()