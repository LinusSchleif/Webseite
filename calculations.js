function calculateCalories() {
    console.log("Chart.js ist geladen?", typeof Chart !== "undefined");
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activity = parseFloat(document.getElementById("activity").value);

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      alert("Bitte alle Felder korrekt ausfüllen.");
      return;
    }

    let bmr;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const tdee = bmr * activity;
    const ziel_abnehmen = tdee - 500;
    const ziel_zunehmen = tdee + 500;

    document.getElementById("results").style.display = "block";
    document.getElementById("results").innerHTML = `
      <strong>Grundumsatz (BMR):</strong> ${bmr.toFixed(2)} kcal/Tag<br>
      <strong>Gesamtumsatz (TDEE):</strong> ${tdee.toFixed(2)} kcal/Tag<br>
      <strong>Ziel zum Abnehmen:</strong> ${ziel_abnehmen.toFixed(0)} kcal/Tag<br>
      <strong>Ziel zum Zunehmen:</strong> ${ziel_zunehmen.toFixed(0)} kcal/Tag
    `;

    const carbs = tdee * 0.5 / 4;
    const protein = tdee * 0.25 / 4;
    const fat = tdee * 0.25 / 9;

    const ctx = document.getElementById('macroChart').getContext('2d');

    if (window.macroChart && typeof window.macroChart.destroy === 'function') 
    {
        window.macroChart.destroy();
    }

    window.macroChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Kohlenhydrate (g)', 'Eiweiß (g)', 'Fett (g)'],
        datasets: [{
          data: [carbs.toFixed(1), protein.toFixed(1), fat.toFixed(1)],
          backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Makronährstoffverteilung (g)'
          }
        }
      }
    });
  }