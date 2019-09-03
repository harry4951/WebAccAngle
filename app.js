var canvas = document.querySelector('canvas');
var statusText = document.querySelector('#statusText');

statusText.addEventListener('click', function() {
  statusText.textContent = 'Rotate...';
  heartRates = [];
  heartRateSensor.connect()
  .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(handleHeartRateMeasurement))
  .catch(error => {
    statusText.textContent = error;
  });
});

function handleHeartRateMeasurement(heartRateMeasurement) {
  heartRateMeasurement.addEventListener('characteristicvaluechanged', event => {
    //var heartRateMeasurement = heartRateSensor.parseHeartRate(event.target.value);
    var heartRateMeasurement = heartRateSensor.parseHeartRate(event);

    var angle = heartRateMeasurement.heartRate[2]/1024.0 * 4.0 ;
    // if(angle > 1.0)
    // {
    //   angle = 1.0;
    // }

    // if(angle < -1.0)
    // {
    //   angle = -1.0;
    // }
    var pi = Math.PI;
    //degree = radians * (180/pi);
    //var degree = Math.asin(angle)*90
    var degree = Math.asin(angle) * (180/pi);
    // if( degree >= 90.0)
    // {
    //   degree = 90.0
    // }
    // else if(degree < -90.0)
    // {
    //   degree = -90.0
    // }
    statusText.innerHTML =  'Accdata: ' + angle.toFixed(2)  + "g <br/>"  + 'Degree: ' +degree.toFixed(2);// + ' &#x2764;'; +  'Rawdata: ' + heartRateMeasurement.heartRate[2]

    heartRates.push(heartRateMeasurement.heartRate);
    //console.log(heartRates);
    drawWaves();
  });
}

var heartRates = [];
var mode = 'bar';

canvas.addEventListener('click', event => {
  //mode = mode === 'bar' ? 'line' : 'bar';
  mode = mode === 'bar' ? 'bar' : 'bar';
  drawWaves();
});

function drawWaves() {
  requestAnimationFrame(() => {
    canvas.width = parseInt(getComputedStyle(canvas).width.slice(0, -2)) * devicePixelRatio;//Dynamically changed
    canvas.height = parseInt(getComputedStyle(canvas).height.slice(0, -2)) * devicePixelRatio;
    var context = canvas.getContext('2d');
    var margin = 2;
    var max = Math.max(0, Math.round(canvas.width / 50));//11
    var offset = Math.max(0, heartRates.length - max);
    //console.log(max);
    var height_offset = Math.max(0, Math.round(canvas.height / 3)); 
    var width_offset = Math.max(0, Math.round(canvas.height / 2));
    /**
      * Removes the first element from an heartRates array.
      */
    if(heartRates.length >= max)
    {
      heartRates.shift();
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#00796B';
    if (mode === 'bar') {
      //context.beginPath();
      
        // for (var i = 0; i < Math.max(heartRates.length, max) - 1; i++) {
        //   //var barHeight = Math.round(heartRates[i + offset ][0] * canvas.height / 200);
        //   var barHeight = Math.round((heartRates[i + offset ][0]) * canvas.height / 200000);
        //   //console.log(barHeight);
        //   context.rect(11 * i + margin + width_offset, canvas.height - barHeight - height_offset - height_offset, margin, Math.max(0, barHeight - margin));
        //   context.stroke();
        // }
  
         for (var i = 0; i < Math.max(heartRates.length, max)- 1; i++) {
           if(heartRates[i + offset ][2] >= 0)
           {
            var barHeight = Math.round((heartRates[i][2]) * canvas.height / 20000 * 20);
            context.rect(11 * i + margin + width_offset, canvas.height - barHeight - height_offset, margin, Math.max(0, barHeight - margin));
            context.stroke();
           }
           else if(heartRates[i + offset ][2] < 0)
           {
            var barHeight = -1 * Math.round((heartRates[i][2]) * canvas.height / 20000 * 20);
            //console.log(barHeight);
            context.rect(11 * i + margin + width_offset, canvas.height - height_offset, margin, Math.max(0, barHeight - margin));
            context.stroke();
           }
         
         }
  
        // for (var i = 0; i < Math.max(heartRates.length, max)- 1; i++) {
        //   //var barHeight = Math.round((heartRates[i + offset ][2]) * canvas.height / 200000);
        //   var barHeight = Math.round((heartRates[i][2]) * canvas.height / 20000 * 5);
        //   context.rect(11 * i + margin + width_offset, canvas.height - barHeight, margin, Math.max(0, barHeight - margin));
        //   context.stroke();
        // }
  
        // for (var i = 0; i < Math.max(heartRates.length, max)- 1; i++) {
        //   var barHeight = Math.round((heartRates[i + offset ][3]) * canvas.height / 200000);
        //   context.rect(11 * i + margin, canvas.height - barHeight - height_offset - height_offset, margin, Math.max(0, barHeight - margin));
        //   context.stroke();
        // }
  
        // for (var i = 0; i < Math.max(heartRates.length, max)- 1; i++) {
        //   var barHeight = Math.round((heartRates[i + offset ][4]) * canvas.height / 200000);
        //   context.rect(11 * i + margin, canvas.height - barHeight - height_offset, margin, Math.max(0, barHeight - margin));
        //   context.stroke();
        // }
  
        // for (var i = 0; i < Math.max(heartRates.length, max)- 1; i++) {
        //   var barHeight = Math.round((heartRates[i + offset ][5]) * canvas.height / 200000);
        //   context.rect(11 * i + margin, canvas.height - barHeight, margin, Math.max(0, barHeight - margin));
        //   context.stroke();
        // }

      

      //context.closePath();
     } //else if (mode === 'line') {
    //   context.beginPath();
    //   context.lineWidth = 6;
    //   context.lineJoin = 'round';
    //   context.shadowBlur = '1';
    //   context.shadowColor = '#333';
    //   context.shadowOffsetY = '1';
    //   for (var i = 0; i < Math.max(heartRates.length, max); i++) {
    //     var lineHeight = Math.round(heartRates[i + offset ] * canvas.height / 200);
    //     if (i === 0) {
    //       context.moveTo(11 * i, canvas.height - lineHeight);
    //     } else {
    //       context.lineTo(11 * i, canvas.height - lineHeight);
    //     }
    //     context.stroke();
    //   }
    //   context.closePath();
    // }
  });
}

window.onresize = drawWaves;

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    drawWaves();
  }
});
