const modeRadios = document.querySelectorAll('input[name="calculation-mode"]');
const inputGroupCalculateBeans = document.getElementById('input-group-calculate-beans');
const inputGroupCalculateBrewVolume = document.getElementById('input-group-calculate-brew-volume');

const inputVolume = document.getElementById('input-volume');
const inputBeans = document.getElementById('input-beans');
const inputRatio = document.getElementById('input-ratio');
const ratioHint = document.getElementById('ratio-hint');

const outputBeans = document.getElementById('output-beans');
const outputBrewVolume = document.getElementById('output-brew-volume');
const outputWaterMR = document.getElementById('output-water-mr');

function displayError(message) {
    outputBeans.classList.add('error-message');
    outputBeans.setAttribute('data-label', 'Error:');
    outputBeans.setAttribute('data-value', message);
    outputBrewVolume.removeAttribute('data-label');
    outputBrewVolume.removeAttribute('data-value');
    outputWaterMR.removeAttribute('data-label');
    outputWaterMR.removeAttribute('data-value');
}


function clearError() {
    outputBeans.classList.remove('error-message');
}

function calculateAndDisplay() {
    clearError();

    const R = parseFloat(inputRatio.value);
    const selectedMode = document.querySelector('input[name="calculation-mode"]:checked').value;

    let M, V, W_mr;
    let error = '';

    if (isNaN(R) || R <= 2) {
        error = "Brew Ratio (R) must be > 2.";
    } else {
        if (selectedMode === 'calculate-beans') {
            const V_input = parseFloat(inputVolume.value);
            if (isNaN(V_input) || V_input <= 0) {
                error = "Desired Brew Volume (V) must be > 0.";
            } else {
                V = V_input;
                M = V / (R - 2);
                W_mr = M * R;
            }
        } else {
            const M_input = parseFloat(inputBeans.value);
            if (isNaN(M_input) || M_input <= 0) {
                error = "Required Coffee Beans (M) must be > 0.";
            } else {
                M = M_input;
                V = M * (R - 2);
                W_mr = M * R;
            }
        }
    }

    if (error) {
        displayError(error);
    } else {
        outputBeans.setAttribute('data-label', 'Coffee Beans:');
        outputBeans.setAttribute('data-value', `${M.toFixed(1)} g`);
        outputBrewVolume.setAttribute('data-label', 'Brew Volume:');
        outputBrewVolume.setAttribute('data-value', `${V.toFixed(1)} ml`);
        outputWaterMR.setAttribute('data-label', 'Hot Water:');
        outputWaterMR.setAttribute('data-value', `${W_mr.toFixed(1)} ml`);
    }
}

function toggleInputGroups() {
    const selectedMode = document.querySelector('input[name="calculation-mode"]:checked').value;
    if (selectedMode === 'calculate-beans') {
        inputGroupCalculateBeans.style.display = 'block';
        inputGroupCalculateBrewVolume.style.display = 'none';
    } else {
        inputGroupCalculateBeans.style.display = 'none';
        inputGroupCalculateBrewVolume.style.display = 'block';
    }
    calculateAndDisplay();
}

inputVolume.addEventListener('input', calculateAndDisplay);
inputBeans.addEventListener('input', calculateAndDisplay);
inputRatio.addEventListener('input', calculateAndDisplay);

modeRadios.forEach(radio => {
    radio.addEventListener('change', toggleInputGroups);
});

toggleInputGroups();