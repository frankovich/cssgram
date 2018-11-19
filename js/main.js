;
(function () {
    'use strict';

    const inputs = document.querySelectorAll('.ba-filters input, #base, #spacing');

    // Add for each input listener for change range or value
    inputs.forEach(function (element) {
        element.addEventListener('change', handleUpdate);
        element.addEventListener('input', handleUpdate);

        if (document.querySelector('[for="' + element.name + '"]+.ba-filter__value')) {
            document.querySelector('[for=' + element.name + ']+.ba-filter__value').textContent = element.value + element.dataset.suffix || "";;
        }
    });

    function handleUpdate() {
        // this == range slider that is changed

        const varName = this.name;
        const suffix = this.dataset.suffix || "";
        const varVal = this.value + suffix;

        setCssVar(varName, varVal);

        // change value in text
        if (document.querySelector('[for="' + varName + '"]+.ba-filter__value')) {
            document.querySelector('[for=' + varName + ']+.ba-filter__value').textContent = varVal;
        }
    }

    function setCssVar(varName, varValue) {
        document.documentElement.style.setProperty("--" + varName, varValue);
        document.documentElement.style.setProperty("--" + varName, varValue);
    }

    const clearBtn = document.querySelector('[data-clear]');
    clearBtn.addEventListener('click', clearAll);

    function clearAll() {
        inputs.forEach(function (element) {
            element.value = element.getAttribute('value');

            const varName = element.name;
            const suffix = element.dataset.suffix || "";
            const varVal = element.value + suffix;
            setCssVar(varName, varVal);

            if (document.querySelector('[for="' + element.name + '"]+.ba-filter__value')) {
                document.querySelector('[for=' + element.name + ']+.ba-filter__value').textContent = element.value + element.dataset.suffix || "";;
            }
        });

    }

    // open new photo
    document.querySelector('[name="change"]').addEventListener('click', changePhoto);
    document.getElementById('upload_hidden').addEventListener('change', PreviewImage);

    function changePhoto() {
        document.getElementById('upload_hidden').click();
    }

    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("upload_hidden").files[0]);

        oFReader.onload = function (oFREvent) {
            document.querySelector(".ba-filtered-img").src = oFREvent.target.result;
        };
    };
})();