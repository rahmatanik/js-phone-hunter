const loadPhone = async (searchText = "12", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  //   console.log(phones);
  //   step 1: get phone container
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container cards before adding new cards
  phoneContainer.textContent = "";
  //
  //  Display show all button if there are more than 12 phonse
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  //   Display only first 12 phones

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // 2. create  a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    //  3. set Inner Html
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="phones"
    />
    </figure>
    <div class="card-body text-center">
    <h1 class="font-bold text-xl text-center" >${phone.phone_name}</h1>
    <h4 class="brand text-center font-bold" >Brand: ${phone.brand}</h4>
    <p class="text-center">Best phone to buy in 2023</p>
    <div class="card-actions justify-center text-center pb-2">
      <button onclick="handleShowDetail('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary hover:bg-green-600 text-white bg-orange-500 border-none ">Show Details</button>
    </div>
  </div>
    
    `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);
  });
  //    Hide loading spinner
  toggleLoadingSpinner(false);
};

// Handle Show Details

const handleShowDetail = async (id) => {
  // console.log("clicked show details", id);
  // Load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// Display modal

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
<img src="${phone.image}">
<P><span>Storage:</span>${phone?.mainFeatures?.storage}</P>
<p><span>GPS:</span>${phone?.others?.GPS || "No GPS"}</p>
`;
  // show the modal
  show_details_modal.showModal();
};

// Search-bar
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// loading spinner

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
  //   console.log("is show all", isShowAll);
};

// Handle show all
const handleShowAll = () => {
  handleSearch(true);
};
loadPhone();
