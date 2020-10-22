const renderArea = document.getElementById('render-area');

const weatherForm = document.getElementById('weather-form');
const weatherInput = document.getElementById('weather-input');

function renderToScreen(elements) {
  renderArea.textContent = '';
  for (let i = 0; i < elements.length; i += 1) {
    const para = document.createElement('p');
    if (elements[i].className) {
      para.classList.add(elements[i].className);
    }
    para.textContent = elements[i].textContent;
    renderArea.appendChild(para);
  }
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderToScreen([{ className: '', textContent: 'Loading...' }]);
  fetch(`http://localhost:3001/weather?address=${weatherInput.value}`).then(
    (res) => {
      res.json().then((data) => {
        if (data.error) {
          renderToScreen([
            { className: 'message--error', textContent: data.error },
          ]);
        } else {
          const { location, forecast } = data;
          renderToScreen([
            { textContent: location },
            { textContent: forecast },
          ]);
        }
        return data;
      });
    },
  );
});
