const accessKey = "WuqZZZHn0IUPwPGbsLpefjCT3johASrNFZCu6qTUKaE"
const searchButton = document.querySelector("#search-button")
const formEL = document.querySelector("form")
const inputEl = document.querySelector("#search-input")
const searchResults = document.querySelector(".search-results")
const searchResult = document.querySelector(".search-result")
const showMore = document.querySelector("#show-more-button")

inputEl.focus()

let inputData = ""
let page = 1

async function searchImages() {
  inputData = inputEl.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

  const response = await fetch(url)
  const data = await response.json()

  const results = data.results

  if (page === 1) {
    searchResults.innerHTML = ""
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div")
    imageWrapper.classList.add("search-result")
    const image = document.createElement("img")
    image.src = result.urls.small
    image.alt = result.alt_description
    const imageLink = document.createElement("a")
    imageLink.href = result.links.html
    imageLink.target = "_blank"
    imageLink.textContent = result.alt_description

    imageWrapper.appendChild(image)
    imageWrapper.appendChild(imageLink)
    searchResults.appendChild(imageWrapper)
  })

  page++
  if (searchResults.childElementCount == 0) {
    const noImage = document.querySelector(".no-image")

    noImage.classList.remove("hidden")
  } else if (page > 1) {
    showMore.style.display = "block"
  }
}

formEL.addEventListener("submit", (e) => {
  e.preventDefault()
  page = 1
  searchImages()
  const noImage = document.querySelector(".no-image")
  noImage.classList.add("hidden")
  showMore.style.display = "none"
})

showMore.addEventListener("click", () => {
  searchImages()
})
