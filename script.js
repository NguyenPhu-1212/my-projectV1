// ================= LOGIN =================
const USER = "admin", PASS = "123456";
const app = document.getElementById('app'); // Thêm khai báo biến app

function isLoggedIn() {
  return localStorage.getItem("login") === "true";
}

function login() {
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  if (!username || !password) {
    alert("Lỗi: Không tìm thấy form đăng nhập!");
    return;
  }

  let u = username.value.trim(), p = password.value.trim();

  console.log("Đang đăng nhập với:", u, p); // Debug

  if (u === USER && p === PASS) {
    localStorage.setItem("login", "true");
    const loginModalEl = document.getElementById('loginModal');
    const loginModal = bootstrap.Modal.getInstance(loginModalEl);
    if (loginModal) {
      loginModal.hide();
    }
    app.style.display = "block";
    showSection('dashboard');
    updateDashboard();
    console.log("Đăng nhập thành công!");
  } else {
    alert("Sai tài khoản hoặc mật khẩu!");
  }
}

function logout() {
  localStorage.removeItem("login");
  location.reload();
}

window.onload = function() {
  // Đợi Bootstrap load xong
  setTimeout(() => {
    // Thêm event listener cho form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Ngăn form submit mặc định
        login();
      });
    }

    if (isLoggedIn()) {
      app.style.display = "block";
      showSection('dashboard');
      updateDashboard();
    } else {
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
        backdrop: 'static',
        keyboard: false
      });
      loginModal.show();
    }
    updateCategory();
  }, 100);
};

// ================= DATA =================
let transactions = JSON.parse(localStorage.getItem("finance")) || [];
let pieChart, lineChart, categoryChart, monthlyChart;

// ================= CATEGORIES =================
const categories = {
  thu: ["Khô gà", "Khô bò", "Mực rim", "Bánh gấu", "Dâu sấy", "Mít sấy", "Heo quay", "Khác"],
  chi: ["Nhân công", "Nguyên liệu", "Máy móc"]
};

function updateCategory() {
  const typeVal = document.getElementById("transactionType").value;
  const select = document.getElementById("transactionCategory");

  select.innerHTML = "";

  categories[typeVal].forEach(c => {
    const op = document.createElement("option");
    op.value = c;
    op.innerText = c;
    select.appendChild(op);
  });
}

function updateEditCategory() {
  const typeVal = document.getElementById("editTransactionType").value;
  const select = document.getElementById("editTransactionCategory");

  select.innerHTML = "";

  categories[typeVal].forEach(c => {
    const op = document.createElement("option");
    op.value = c;
    op.innerText = c;
    select.appendChild(op);
  });
}

// ================= SAVE DATA =================
function saveData() {
  localStorage.setItem("finance", JSON.stringify(transactions));
}

// ================= SIDEBAR =================
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  // Remove active class from sidebar links
  const sidebarLinks = document.querySelectorAll('#sidebar ul li');
  sidebarLinks.forEach(link => link.classList.remove('active'));

  // Show selected section
  document.getElementById(sectionName + '-section').classList.add('active');

  // Add active class to clicked link
  event.target.closest('li').classList.add('active');

  // Update dashboard if dashboard is shown
  if (sectionName === 'dashboard') {
    updateDashboard();
  } else if (sectionName === 'transactions') {
    renderTransactions();
  } else if (sectionName === 'reports') {
    updateReports();
  }
}

// Sidebar toggle
document.getElementById('sidebarCollapse').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementById('content').classList.toggle('active');
});

// ================= DASHBOARD =================
function updateDashboard() {
  let totalIncome = 0, totalExpense = 0, balance = 0;

  transactions.forEach(t => {
    if (t.type === "thu") {
      totalIncome += t.amount;
      balance += t.amount;
    } else {
      totalExpense += t.amount;
      balance -= t.amount;
    }
  });

  document.getElementById('totalIncome').textContent = totalIncome.toLocaleString("vi-VN") + "₫";
  document.getElementById('totalExpense').textContent = totalExpense.toLocaleString("vi-VN") + "₫";
  document.getElementById('balance').textContent = balance.toLocaleString("vi-VN") + "₫";
  document.getElementById('transactionCount').textContent = transactions.length;

  updatePieChart(totalIncome, totalExpense);
  updateLineChart();
  renderRecentTransactions();
}

function updatePieChart(income, expense) {
  const ctx = document.getElementById('pieChart').getContext('2d');

  if (pieChart) pieChart.destroy();

  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Thu', 'Chi'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#27ae60', '#e74c3c'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed.toLocaleString("vi-VN") + '₫';
            }
          }
        }
      }
    }
  });
}

function updateLineChart() {
  const ctx = document.getElementById('lineChart').getContext('2d');

  if (lineChart) lineChart.destroy();

  // Get last 30 days data
  const last30Days = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    last30Days.push(dateStr);
  }

  const incomeData = last30Days.map(date => {
    return transactions
      .filter(t => t.date === date && t.type === 'thu')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const expenseData = last30Days.map(date => {
    return transactions
      .filter(t => t.date === date && t.type === 'chi')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: last30Days.map(date => new Date(date).toLocaleDateString('vi-VN')),
      datasets: [{
        label: 'Thu',
        data: incomeData,
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        tension: 0.4
      }, {
        label: 'Chi',
        data: expenseData,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString("vi-VN") + '₫';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y.toLocaleString("vi-VN") + '₫';
            }
          }
        }
      }
    }
  });
}

function renderRecentTransactions() {
  const tbody = document.querySelector('#recentTransactionsTable tbody');
  tbody.innerHTML = '';

  const recentTransactions = transactions.slice(-5).reverse();

  recentTransactions.forEach((t, index) => {
    const row = document.createElement('tr');
    const originalIndex = transactions.length - 1 - index;

    row.innerHTML = `
      <td>${new Date(t.date).toLocaleDateString("vi-VN")}</td>
      <td><span class="badge bg-${t.type === 'thu' ? 'success' : 'danger'}">${t.type.toUpperCase()}</span></td>
      <td>${t.category}</td>
      <td>${t.amount.toLocaleString("vi-VN")}₫</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="editTransaction(${originalIndex})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTransaction(${originalIndex})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// ================= TRANSACTIONS =================
function saveTransaction() {
  const type = document.getElementById('transactionType').value;
  const amount = Number(document.getElementById('transactionAmount').value);
  const category = document.getElementById('transactionCategory').value;
  const date = document.getElementById('transactionDate').value;
  const note = document.getElementById('transactionNote').value;

  if (!amount || !date) {
    alert("Thiếu thông tin!");
    return;
  }

  const transaction = { type, amount, category, date, note };
  transactions.push(transaction);
  saveData();

  // Reset form
  document.getElementById('transactionForm').reset();
  updateCategory();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('addTransactionModal'));
  modal.hide();

  // Update UI
  updateDashboard();
  renderTransactions();
}

function editTransaction(index) {
  const t = transactions[index];

  document.getElementById('editIndex').value = index;
  document.getElementById('editTransactionType').value = t.type;
  updateEditCategory();
  document.getElementById('editTransactionCategory').value = t.category;
  document.getElementById('editTransactionAmount').value = t.amount;
  document.getElementById('editTransactionDate').value = t.date;
  document.getElementById('editTransactionNote').value = t.note || '';

  const modal = new bootstrap.Modal(document.getElementById('editTransactionModal'));
  modal.show();
}

function updateTransaction() {
  const index = document.getElementById('editIndex').value;
  const type = document.getElementById('editTransactionType').value;
  const amount = Number(document.getElementById('editTransactionAmount').value);
  const category = document.getElementById('editTransactionCategory').value;
  const date = document.getElementById('editTransactionDate').value;
  const note = document.getElementById('editTransactionNote').value;

  if (!amount || !date) {
    alert("Thiếu thông tin!");
    return;
  }

  transactions[index] = { type, amount, category, date, note };
  saveData();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('editTransactionModal'));
  modal.hide();

  // Update UI
  updateDashboard();
  renderTransactions();
}

function deleteTransaction(index) {
  if (confirm('Bạn có chắc muốn xóa giao dịch này?')) {
    transactions.splice(index, 1);
    saveData();
    updateDashboard();
    renderTransactions();
  }
}

function renderTransactions() {
  const tbody = document.querySelector('#transactionsTable tbody');
  tbody.innerHTML = '';

  transactions.forEach((t, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${new Date(t.date).toLocaleDateString("vi-VN")}</td>
      <td><span class="badge bg-${t.type === 'thu' ? 'success' : 'danger'}">${t.type.toUpperCase()}</span></td>
      <td>${t.category}</td>
      <td>${t.amount.toLocaleString("vi-VN")}₫</td>
      <td>${t.note || '-'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editTransaction(${index})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTransaction(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// ================= FILTERS =================
function applyFilters() {
  const filterDate = document.getElementById('filterDate').value;
  const filterMonth = document.getElementById('filterMonth').value;
  const filterType = document.getElementById('filterType').value;
  const searchTerm = document.getElementById('search').value.toLowerCase();

  let filteredTransactions = transactions;

  if (filterDate) {
    filteredTransactions = filteredTransactions.filter(t => t.date === filterDate);
  }

  if (filterMonth) {
    filteredTransactions = filteredTransactions.filter(t => t.date.startsWith(filterMonth));
  }

  if (filterType) {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }

  if (searchTerm) {
    filteredTransactions = filteredTransactions.filter(t =>
      t.category.toLowerCase().includes(searchTerm) || (t.note && t.note.toLowerCase().includes(searchTerm))
    );
  }

  renderFilteredTransactions(filteredTransactions);
}

function clearFilters() {
  document.getElementById('filterDate').value = '';
  document.getElementById('filterMonth').value = '';
  document.getElementById('filterType').value = '';
  document.getElementById('search').value = '';
  renderTransactions();
}

function renderFilteredTransactions(filteredTransactions) {
  const tbody = document.querySelector('#transactionsTable tbody');
  tbody.innerHTML = '';

  filteredTransactions.forEach((t, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${new Date(t.date).toLocaleDateString("vi-VN")}</td>
      <td><span class="badge bg-${t.type === 'thu' ? 'success' : 'danger'}">${t.type.toUpperCase()}</span></td>
      <td>${t.category}</td>
      <td>${t.amount.toLocaleString("vi-VN")}₫</td>
      <td>${t.note || '-'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editTransaction(${index})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTransaction(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// ================= REPORTS =================
function updateReports() {
  updateCategoryChart();
  updateMonthlyChart();
}

function updateCategoryChart() {
  const ctx = document.getElementById('categoryChart').getContext('2d');

  if (categoryChart) categoryChart.destroy();

  const categoryData = {};

  transactions.forEach(t => {
    if (!categoryData[t.category]) {
      categoryData[t.category] = { thu: 0, chi: 0 };
    }
    categoryData[t.category][t.type] += t.amount;
  });

  const labels = Object.keys(categoryData);
  const thuData = labels.map(cat => categoryData[cat].thu);
  const chiData = labels.map(cat => categoryData[cat].chi);

  categoryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Thu',
        data: thuData,
        backgroundColor: '#27ae60'
      }, {
        label: 'Chi',
        data: chiData,
        backgroundColor: '#e74c3c'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString("vi-VN") + '₫';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y.toLocaleString("vi-VN") + '₫';
            }
          }
        }
      }
    }
  });
}

function updateMonthlyChart() {
  const ctx = document.getElementById('monthlyChart').getContext('2d');

  if (monthlyChart) monthlyChart.destroy();

  const monthlyData = {};

  transactions.forEach(t => {
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!monthlyData[month]) {
      monthlyData[month] = { thu: 0, chi: 0 };
    }
    monthlyData[month][t.type] += t.amount;
  });

  const labels = Object.keys(monthlyData).sort();
  const thuData = labels.map(month => monthlyData[month].thu);
  const chiData = labels.map(month => monthlyData[month].chi);

  monthlyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.map(month => {
        const [year, monthNum] = month.split('-');
        return `${monthNum}/${year}`;
      }),
      datasets: [{
        label: 'Thu',
        data: thuData,
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        tension: 0.4
      }, {
        label: 'Chi',
        data: chiData,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString("vi-VN") + '₫';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y.toLocaleString("vi-VN") + '₫';
            }
          }
        }
      }
    }
  });
}

// ================= EXPORT =================
function exportToCSV() {
  let csv = "Ngày,Loại,Danh mục,Số tiền,Ghi chú\n";

  transactions.forEach(t => {
    csv += `${t.date},${t.type},${t.category},${t.amount},"${t.note || ''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "giao-dich.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportToJSON() {
  const dataStr = JSON.stringify(transactions, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "giao-dich.json");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica");
  doc.setFontSize(16);
  doc.text("Báo cáo Giao dịch Tài chính", 20, 20);

  const tableData = transactions.map(t => [
    new Date(t.date).toLocaleDateString("vi-VN"),
    t.type.toUpperCase(),
    t.category,
    t.amount.toLocaleString("vi-VN") + "₫",
    t.note || ""
  ]);

  doc.autoTable({
    head: [['Ngày', 'Loại', 'Danh mục', 'Số tiền', 'Ghi chú']],
    body: tableData,
    startY: 30,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [102, 126, 234] }
  });

  doc.save("bao-cao-giao-dich.pdf");
}

// ================= IMPORT =================
function importData() {
  const fileInput = document.getElementById('importFile');
  const file = fileInput.files[0];

  if (!file) {
    alert('Vui lòng chọn file!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (Array.isArray(importedData)) {
        transactions = [...transactions, ...importedData];
        saveData();
        updateDashboard();
        renderTransactions();
        alert('Nhập dữ liệu thành công!');
      } else {
        alert('File không hợp lệ!');
      }
    } catch (error) {
      alert('Lỗi khi đọc file!');
    }
  };
  reader.readAsText(file);
}

// ================= SETTINGS =================
function clearAllData() {
  if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu? Hành động này không thể hoàn tác!')) {
    transactions = [];
    saveData();
    updateDashboard();
    renderTransactions();
    alert('Đã xóa tất cả dữ liệu!');
  }
}

// ================= DARK MODE =================
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ================= FORM HANDLERS =================
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  login();
});

document.getElementById('transactionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  saveTransaction();
});

document.getElementById('editTransactionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  updateTransaction();
});