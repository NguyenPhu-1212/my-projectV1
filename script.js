// ================= LOGIN =================
const USER="admin", PASS="123456";

function isLoggedIn(){
  return localStorage.getItem("login")==="true";
}

function login(){
  let u=username.value, p=password.value;

  if(u===USER && p===PASS){
    localStorage.setItem("login","true");
    loginBox.style.display="none";
    app.style.display="block";
    render();
  } else {
    alert("Sai tài khoản!");
  }
}

function logout(){
  localStorage.removeItem("login");
  location.reload();
}

window.onload=function(){
  if(isLoggedIn()){
    loginBox.style.display="none";
    app.style.display="block";
    render();
  }
  updateCategory();
};

// ================= DATA =================
let transactions = JSON.parse(localStorage.getItem("finance")) || [];
let chart;
let editIndex = null;

function saveData(){
  localStorage.setItem("finance", JSON.stringify(transactions));
}

// ================= CATEGORY =================
const categories = {
  thu: ["Khô gà","Khô bò","Mực rim","Bánh gấu","Dâu sấy","Mít sấy","Heo quay","Khác"],
  chi: ["Nhân công","Nguyên liệu","Máy móc"]
};

function updateCategory(){
  let typeVal = document.getElementById("type").value;
  let select = document.getElementById("category");

  select.innerHTML = "";

  categories[typeVal].forEach(c=>{
    let op = document.createElement("option");
    op.value = c;
    op.innerText = c;
    select.appendChild(op);
  });
}

// ================= ADD / EDIT =================
function addTransaction(){
  if(!isLoggedIn()) return alert("Phải đăng nhập!");

  let t = {
    type: type.value,
    amount: Number(amount.value),
    category: category.value,
    date: date.value
  };

  if(!t.amount || !t.date){
    alert("Thiếu!");
    return;
  }

  if(editIndex !== null){
    transactions[editIndex] = t;
    editIndex = null;
  } else {
    transactions.push(t);
  }

  saveData();
  render();

  // =========================
  // RESET FORM SAU KHI THÊM
  // =========================
  type.value = "thu";        // reset thu/chi về mặc định
  updateCategory();          // cập nhật lại danh mục theo thu
  amount.value = "";         // reset số tiền
  date.value = "";           // reset ngày
}

// ================= EDIT =================
function editItem(i){
  let t = transactions[i];

  type.value = t.type;
  updateCategory();
  category.value = t.category;

  amount.value = t.amount;
  date.value = t.date;

  editIndex = i;
}

// ================= DELETE =================
function deleteItem(i){
  transactions.splice(i,1);
  saveData();
  render();
}

// ================= RENDER =================
function render(){
  if(!isLoggedIn()) return;

  list.innerHTML = "";

  let total = 0, thu = 0, chi = 0;

  transactions.forEach((t,i)=>{
    let li = document.createElement("li");
    let color = t.type==="thu" ? "#27ae60" : "#e74c3c";

    li.innerHTML = `
      <span style="color:${color}; font-weight: 600;">
        <i class="fas fa-${t.type==='thu' ? 'arrow-up' : 'arrow-down'}"></i>
        ${new Date(t.date).toLocaleDateString("vi-VN")} |
        ${t.type.toUpperCase()} - ${t.category}: ${t.amount.toLocaleString("vi-VN")}₫
      </span>
      <div class="action-buttons">
        <button onclick="editItem(${i})" class="edit-btn"><i class="fas fa-edit"></i> Sửa</button>
        <button onclick="deleteItem(${i})" class="delete-btn"><i class="fas fa-trash"></i> Xóa</button>
      </div>
    `;

    list.appendChild(li);

    if(t.type==="thu"){ total+=t.amount; thu+=t.amount; }
    else{ total-=t.amount; chi+=t.amount; }
  });

  let totalEl = document.getElementById("total");
  totalEl.style.color = total>=0 ? "#27ae60" : "#e74c3c";
  totalEl.innerHTML = `
    <i class="fas fa-calculator"></i>
    <strong>Tổng cộng: ${total.toLocaleString("vi-VN")}₫</strong>
    <br>
    <small>Thu: ${thu.toLocaleString("vi-VN")}₫ | Chi: ${chi.toLocaleString("vi-VN")}₫</small>
  `;

  drawChart(thu,chi);
}

// ================= CHART =================
function drawChart(thu,chi){
  let ctx = myChart.getContext("2d");

  if(chart) chart.destroy();

  chart = new Chart(ctx,{
    type:"pie",
    data:{
      labels:["Thu","Chi"],
      datasets:[{
        data:[thu,chi],
        backgroundColor:["#27ae60","#e74c3c"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              label += context.parsed.toLocaleString("vi-VN") + '₫';
              return label;
            }
          }
        }
      }
    }
  });
}

// ================= FILTER =================
function filterData(){
  let d = filterDate.value;
  renderFiltered(transactions.filter(t=>t.date===d),"Ngày");
}

function filterByMonth(){
  let m = filterMonth.value;
  renderFiltered(transactions.filter(t=>t.date.startsWith(m)),"Tháng");
}

// ================= SEARCH =================
function searchData(){
  let k = search.value.toLowerCase();
  renderFiltered(transactions.filter(t=>t.category.toLowerCase().includes(k)),"Tìm");
}

// ================= RENDER FILTER =================
function renderFiltered(data,label){
  list.innerHTML="";

  let thu=0, chi=0;

  data.forEach(t=>{
    let li=document.createElement("li");
    let color = t.type==="thu" ? "#27ae60" : "#e74c3c";
    li.innerHTML = `
      <span style="color:${color}; font-weight: 600;">
        <i class="fas fa-${t.type==='thu' ? 'arrow-up' : 'arrow-down'}"></i>
        ${t.date} | ${t.type.toUpperCase()} - ${t.category}: ${t.amount.toLocaleString("vi-VN")}₫
      </span>
    `;
    list.appendChild(li);

    if(t.type==="thu") thu+=t.amount;
    else chi+=t.amount;
  });

  let totalEl = document.getElementById("total");
  totalEl.innerHTML = `
    <i class="fas fa-chart-bar"></i>
    <strong>${label}</strong><br>
    <span style="color:#27ae60;">Thu: ${thu.toLocaleString("vi-VN")}₫</span> |
    <span style="color:#e74c3c;">Chi: ${chi.toLocaleString("vi-VN")}₫</span> |
    <span style="color:${thu-chi>=0?'#27ae60':'#e74c3c'};">Lợi: ${(thu-chi).toLocaleString("vi-VN")}₫</span>
  `;

  drawChart(thu,chi);
}

// ================= EXPORT =================
function exportExcel(){
  let csv="Ngày,Loại,Số tiền,Danh mục\n";

  transactions.forEach(t=>{
    csv+=`${t.date},${t.type},${t.amount},${t.category}\n`;
  });

  let blob=new Blob([csv]);
  let a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="data.csv";
  a.click();
}

// ================= DARK =================
function toggleDark(){
  document.body.classList.toggle("dark");
}