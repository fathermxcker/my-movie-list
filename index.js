(function () {
  // write your code here
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = [] // 因為 data 不應該是會變動的固定資料，所以用 const


  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results) //展開運算子...把陣列元素展開
      // console.log(data)

    })
    .catch((err) => console.log(err))
})()