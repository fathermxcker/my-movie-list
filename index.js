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
          </div>
          </div>
      `
      dataPanel.innerHTML = htmlContent
    })
  }


})()