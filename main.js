Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
     document.getElementById("results").innerHTML='<img id= "captured_image" src="'+data_uri+'"/>'
    });
}

console.log( "ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cx2JRecrD/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+ predicition_1;
    speak_data_2="And the second prediction is "+ predicition_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}


function gotResult(error, results)
{
if (error){
    console.error(error);
} else {
    console.log(results);
    document.getElementById("emotion_name").innerHTML=results[0].label;
    document.getElementById("emotion_name2").innerHTML=results[1].label;
    predicition_1=results[0].label;
    predicition_2=results[1].label;
    speak();

    if(results[0].label=="Thumbs_Up")
    {
        document.getElementById("update_emoji").innerHTML= "&#9996";
    }
    if(results[0].label=="Okay")
        {
            document.getElementById("update_emoji").innerHTML= "&#128076";
        }
     if(results[0].label=="Wave")
         {
            document.getElementById("update_emoji").innerHTML= "&#128077";
        }
        if(results[0].label=="Victory")
            {
                document.getElementById("update_emoji").innerHTML= "&#128075";
            }
        if(results[1].label=="Thumbs_Up")
            {
                document.getElementById("update_emoji2").innerHTML= "&#9996";
            }
            if(results[1].label=="Okay")
                {
                    document.getElementById("update_emoji2").innerHTML= "&#128076";
                }
                if(results[1].label=="Wave")
                    {
                       document.getElementById("update_emoji2").innerHTML= "&#128077";
                   }
                   if(results[1].label=="Victory")
                    {
                       document.getElementById("update_emoji2").innerHTML= "&#128075";
                   }
}
}
