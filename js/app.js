
var button = document.getElementById("Btn");
button.addEventListener("click", function() {
    button.classList.remove("fa-search", "fa");
    button.classList.add("fas","fa-circle-notch","fa-spin");

    let xhttp = new XMLHttpRequest();
    let data = document.getElementById("data").value;
    let parameter = "data=" + data;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            var output = '';

            if (response.code == '0') {
                output += '<span style="color:#db6565;">!يرجي ادخال نص</span>';
            }
            
            else if (response.code == '5') {
                output += '<span style="color:#db6565;">!خطأ في الخادم</span>';
            }
            
            else if (response.code == '9') {
                output += '<span style="color:#db6565;">!يرجي ادخال حروف عربية</span>';
            }
            
            else if (response.code == '1') {
                if ( response.data.code == '1' ) {
                    var hold = '';
                    var i = 0;
                    response.data.phrase.split(" ").forEach(function(item) {
                        if (item != '') {
                            hold += '<tr>';
                            hold += '<td>' + item + '</td>';
                            hold += '<td>' + response.data.prosody.on_off.split(" ")[i] + '</td>';
                            hold += '<td>' + response.data.prosody.formation.split(" ")[i] + '</td>';
                            hold += '</tr>';
                        }
                        i++;
                    });
                    output += `<table>
                        <thead>
                            <tr>
                                <th>التقطيع</th>
                                <th>الحركات</th>
                                <th>الوزن</th>
                            </tr>
                        </thead>
                        <tbody>` + hold + `</tbody>
                    </table>`;
                    output += '<p style="color:#22df2d;">' + response.data.prosody.bahr + '</p>';
                } else {
                    output += '<p style="word-break: break-all;">' + response.data.phrase + '</p>';
                    output += '<p dir="rtl">' + response.data.prosody.on_off + '</p>';
                    if (response.data.phrase.length > 14) {
                        output += '<p style="color:#db6565;">عفوا لم يتم إيجاد البحر، حاول تشكيل بعض الحروف والتأكد من كتابة النص بشكل صحيح</p>';                        
                    }
                    response.data.similarity.forEach(function(element) {
                        output += `<div class="single-chart">
                            <svg viewBox="0 0 36 36" class="circular-chart">
                                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path class="circle" stroke-dasharray="` + element.percent + `, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <text x="18" y="20.35" class="percentage">` + element.percent + `%</text>
                            </svg>
                            <p>` + element.bahr + `</p>
                        </div>`;
                    });
                }

            }

            document.getElementById("response").innerHTML = output;
            button.classList.add("fa-search", "fa");
            button.classList.remove("fas","fa-circle-notch","fa-spin");
        }
    };
    xhttp.open("POST", "https://t33fa.000webhostapp.com/github/prosody/server.php", true);
    xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhttp.send(parameter);
});
