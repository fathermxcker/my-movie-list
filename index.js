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

            <!-- Button trigger modal -->
            <div class="card-footer">
              <button type="button" class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal">
                more
              </button>


              <!-- Modal -->
              <div class="modal fade" id="show-movie-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="show-movie-title">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                      </button>
                    </div>
                    <div class="modal-body" id="show-movie-body">

                      <div class="row">
                        <div class="col-sm-8" id="show-movie-image">
                        </div>
                        <div class="col-sm-4">
                          <p><em id="show-movie-date"></em></p>
                          <p id="show-movie-description"></p>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>



          </div>
        </div>
      `
      dataPanel.innerHTML = htmlContent
    })
  }


})()