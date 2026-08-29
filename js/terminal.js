/**
 * Interactive Developer Terminal & API Simulation Widget
 * Demonstrates Syed's FastAPI & PostgreSQL backend workflow interactively.
 */

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.widget-tab-btn');
  const tabPanes = document.querySelectorAll('.dev-widget-pane');
  const sendRequestBtn = document.getElementById('btn-send-request');
  const apiStatusText = document.getElementById('api-status-badge');
  const apiOutputContainer = document.getElementById('api-response-output');
  const latencyDisplay = document.getElementById('api-latency');

  // Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.add('hidden'));

      btn.classList.add('active');
      const activePane = document.getElementById(`pane-${targetTab}`);
      if (activePane) {
        activePane.classList.remove('hidden');
      }
    });
  });

  // Simulated API Requests
  const mockProducts = [
    {
      id: 101,
      name: "Mechanical Keyboard Pro",
      sku: "TECH-KB-101",
      category: "Hardware",
      price: 89.99,
      stock_quantity: 45,
      is_active: true,
      created_at: "2026-08-29T09:30:00Z"
    },
    {
      id: 102,
      name: "Ergonomic Desk Monitor Arm",
      sku: "TECH-ARM-102",
      category: "Accessories",
      price: 54.50,
      stock_quantity: 28,
      is_active: true,
      created_at: "2026-08-29T09:35:00Z"
    },
    {
      id: 103,
      name: "USB-C Multiport Hub",
      sku: "TECH-HUB-103",
      category: "Peripherals",
      price: 34.00,
      stock_quantity: 90,
      is_active: true,
      created_at: "2026-08-29T09:38:00Z"
    }
  ];

  let requestIndex = 0;

  if (sendRequestBtn && apiOutputContainer) {
    sendRequestBtn.addEventListener('click', () => {
      // Visual loading state
      sendRequestBtn.disabled = true;
      sendRequestBtn.innerHTML = `
        <svg class="spin-animation" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg> Executing query...
      `;
      
      if (apiStatusText) {
        apiStatusText.textContent = "Processing SQL...";
        apiStatusText.style.color = "#E5C07B";
      }

      const randomLatency = Math.floor(Math.random() * 12) + 18; // 18ms - 30ms realistic local FastAPI + PG response

      setTimeout(() => {
        const product = mockProducts[requestIndex % mockProducts.length];
        requestIndex++;

        // Render formatted colored JSON
        apiOutputContainer.innerHTML = `
<div class="terminal-line"><span class="prompt-symbol">→</span> <span class="http-method">200 OK</span> <span class="terminal-comment"># FastAPI returned structured Pydantic schema</span></div>
<pre><code>{
  <span class="json-key">"status"</span>: <span class="json-str">"success"</span>,
  <span class="json-key">"database"</span>: <span class="json-str">"PostgreSQL 16"</span>,
  <span class="json-key">"data"</span>: {
    <span class="json-key">"id"</span>: <span class="json-num">${product.id}</span>,
    <span class="json-key">"name"</span>: <span class="json-str">"${product.name}"</span>,
    <span class="json-key">"sku"</span>: <span class="json-str">"${product.sku}"</span>,
    <span class="json-key">"category"</span>: <span class="json-str">"${product.category}"</span>,
    <span class="json-key">"price"</span>: <span class="json-num">${product.price.toFixed(2)}</span>,
    <span class="json-key">"stock_quantity"</span>: <span class="json-num">${product.stock_quantity}</span>,
    <span class="json-key">"is_active"</span>: <span class="json-bool">${product.is_active}</span>
  }
}</code></pre>`;

        if (apiStatusText) {
          apiStatusText.textContent = "200 OK";
          apiStatusText.style.color = "#98C379";
        }

        if (latencyDisplay) {
          latencyDisplay.textContent = `${randomLatency}ms`;
        }

        sendRequestBtn.disabled = false;
        sendRequestBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg> Execute GET /products/${product.id}
        `;
      }, 350);
    });
  }
});
