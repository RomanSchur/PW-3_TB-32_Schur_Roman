function Integral(pd, Lower_Bound, Upper_bound) {
    const steps = 1000;
    const stepSize = (Upper_bound - Lower_Bound) / steps;
    let integral = 0;
    for (let i = 0; i < steps; i++) {
        const x1 = Lower_Bound + i * stepSize;
        const x2 = x1 + stepSize;
        integral += (pd(x1) + pd(x2)) * stepSize / 2;
    }
    return integral;
}

function calculate() {
    let Avg_power = parseFloat(document.getElementById("1").value); // середньодобова потужність
    let Avge_dev = parseFloat(document.getElementById("2").value);  // середнє відхилення
    let Need_dev = parseFloat(document.getElementById("3").value);  // зменшена похибка
    let Cost_elect = parseFloat(document.getElementById("4").value); // ціна за електроенергію
    if (isNaN(Avg_power) || isNaN(Avge_dev) || isNaN(Need_dev) || isNaN(Cost_elect)) {
        alert("Потрібно заповнити всі поля!");
        return;
    }
    let Pd = function(p) {
        return (1 / (Avge_dev * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(p - Avg_power, 2) / (2 * Math.pow(Avge_dev, 2)));
    };

    let upperBound = Need_dev+5;
    let lowerBound = 5-Need_dev;
    let Qw1 = Integral(Pd, lowerBound, upperBound);
    let W1= Avg_power*24*Qw1;
    let Profit = W1*Cost_elect;
    let W2= Avg_power*24*(1-Qw1);
    let Profit2 = W2*Cost_elect;
    Res_prof1=Profit-Profit2;


    let Pd2 = function(p) {
        return (1 / (Need_dev * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(p - Avg_power, 2) / (2 * Math.pow(Need_dev, 2)));};
    let Qw2 = Integral(Pd2, lowerBound, upperBound);
    let W3= Avg_power*24*Qw2;
    let Profit3 = W3*Cost_elect;
    let W4= Avg_power*24*(1-Qw2);
    let Profit4 = W4*Cost_elect;
    Res_prof2=Profit3-Profit4;
    document.getElementById("res").innerHTML = `
                <h3>Результати розрахунків</h3>
                <ul>
                    <li><h3>Прибуток при Q1: ${Res_prof1.toFixed(3)} грн</h3></li>
                    <li><h3>Прибуток при Q2: ${Res_prof2.toFixed(3)} грн</h3></li>
                </ul>`;

}
