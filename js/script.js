//declaring inputs, buttons, table and lists//

var pName = document.getElementById("pName");
var pPrice = document.getElementById("pPrice");
var pCategory = document.getElementById("pCategory");
var pDes = document.getElementById("pDes");
var errorMsg = document.getElementsByTagName("span");

var prouctTable = document.getElementById("productFrmBody");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateProduct");
var productList = [];
var matchedList = [];
var editIndex = -1;
var searchIndex =-1;
var localStorKey = "allProducts";

addBtn.addEventListener("click", addRecord);
updateBtn.addEventListener("click", updateRow);

if (localStorage.getItem(localStorKey)) {
  productList = JSON.parse(localStorage.getItem(localStorKey));
  showInTable(productList);
}

function addToLocalStorage() {
  localStorage.setItem(localStorKey, JSON.stringify(productList));
}

function addRecord(e) {
  e.preventDefault();

  if (productNameValidate()) {
    var product = {
      name: pName.value,
      price: pPrice.value,
      category: pCategory.value,
      des: pDes.value,
      index: productList.length,
    };
    productList.push(product);
    addToLocalStorage();
    resetProductTable();
    showInTable(productList);
  }
}

function showInTable(list) {
  var row = "";
  for (var i = 0; i < list.length; i++) {
    row += `<tr>
            <td>${i + 1}</td>
            <td>${list[i].newName ? list[i].newName : list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
            <td>${list[i].des}</td>
            <td><button id="edit" onclick="editRow(${i})" class="btn btn-outline-success">Edit</button></td>
            <td><button id="delete" onclick="deleteRow(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
  }
  prouctTable.innerHTML = row;
}

function resetProductTable() {
  pName.value = "";
  pPrice.value = "";
  pCategory.value = "";
  pDes.value = "";
}

function deleteRow(i) {
  var originalIndex;
  if (matchedList[i]) {
    originalIndex = matchedList[i].originalIndex;
  } else {
    originalIndex = i;
  }

  productList.splice(originalIndex, 1);
  deleteNewName();
  addToLocalStorage();
  showInTable(productList);
}

function editRow(i) {
  var originalIndex;
  if (matchedList[i]) {
    originalIndex = matchedList[i].originalIndex;
  } else {
    originalIndex = i;
  }

  /////////////////
  pName.value = productList[originalIndex].name;
  pPrice.value = productList[originalIndex].price;
  pCategory.value = productList[originalIndex].category;
  pDes.value = productList[originalIndex].des;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  editIndex = originalIndex;
}

function updateRow(e) {
  e.preventDefault();
  var product = {
    name: pName.value,
    price: pPrice.value,
    category: pCategory.value,
    des: pDes.value,
  };
<<<<<<< HEAD

  deleteNewName();
  productList.splice(editIndex, 1, product);
  addToLocalStorage();
  showInTable(productList);
  resetProductTable();

  editIndex = -1;

=======
  
   var indexToUpdate = editIndex !== false ? editIndex : searchIndex;
 
  productList.splice(indexToUpdate, 1, product);
  addToLocalStorage();
  showInTable(productList);
  resetProductTable();
  
 editIndex = false;
  
>>>>>>> 73b6a2c58325043e43deace03943db37de1ec2c2
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function deleteNewName() {
  productList.forEach(function (product) {
    delete product.newName;
  });
}

function searchProduct() {
  matchedList = [];
  var keySearch = document.getElementById("Psearch").value;
  var regex = new RegExp(keySearch, "gi");
  console.log(regex);
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(keySearch.toLowerCase())) {
      //  prettier-ignore
      productList[i].newName = productList[i].name.replace(regex, function (match) {
          return `<span class="text-danger fw-bolder">${match}</span>`;
        
        }
      );
<<<<<<< HEAD
      matchedList.push({ ...productList[i], originalIndex: i });
=======
      matchedList.push(productList[i]);
      searchIndex = matchedList[i].index;
>>>>>>> 73b6a2c58325043e43deace03943db37de1ec2c2
    }
  }

  if (matchedList.length) {
    errorMsg[4].classList.replace("d-inline-block", "d-none");
  } else {
    errorMsg[4].classList.replace("d-none", "d-inline-block");
  }
  showInTable(matchedList);
}

function productNameValidate() {
  var nameRegex = /^([a-z]{2,}\d{0,}([\s]){0,1}){1,2}$/gi;
  var priceRegex = /^(?!0)([0-9]{4}|10000)$/;
  var catRegex = /^((p|P)hone|(t|T)ablet|(s|S)martwatch)$/;
  var desRegex = /^([a-z]|[0-9]|\s|\W){1,250}$/;

  var isNameValid = nameRegex.test(pName.value);
  var isPriceValid = priceRegex.test(pPrice.value);
  var isCatValid = catRegex.test(pCategory.value);
  var isDesValid = desRegex.test(pDes.value);

  if (isNameValid) {
    errorMsg[0].classList.replace("d-inline-block", "d-none");
  } else {
    errorMsg[0].classList.replace("d-none", "d-inline-block");
  }

  if (isPriceValid) {
    errorMsg[1].classList.replace("d-inline-block", "d-none");
  } else {
    errorMsg[1].classList.replace("d-none", "d-inline-block");
  }

  if (isCatValid) {
    errorMsg[2].classList.replace("d-inline-block", "d-none");
  } else {
    errorMsg[2].classList.replace("d-none", "d-inline-block");
  }

  if (isDesValid) {
    errorMsg[3].classList.replace("d-inline-block", "d-none");
  } else {
    errorMsg[3].classList.replace("d-none", "d-inline-block");
  }
//  var isValid = isNameValid && isPriceValid && isCatValid && isDesValid;
var isValid = true;
  return isValid;
}
