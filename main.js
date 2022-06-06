quick_draw_data_set=["aircraft_carrier","airplane","alarm_clock","ambulance","angel","animal_migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball_bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday_cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling_fan","cello","cell_phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee_cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise_ship","cup","diamond","dishwasher","diving_board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear","elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire_hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip_flops","floor_lamp","flower","flying_saucer","foot","fork","frog","frying_pan","garden","garden_hose","giraffe","goatee","golf_club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey_puck","hockey_stick","horse","hospital","hot_air_balloon","hot_dog","hot_tub","hourglass","house","house_plant","hurricane","ice_cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light_bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint_can","palm_tree","panda","pants","paper_clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup_truck","picture_frame","pig","pillow","pineapple","pizza","pliers","police_car","pond","pool","popsicle","postcard","potato","power_outlet","purse","rabbit","raccoon","radio","rain","rainbow","rake","remote_control","rhinoceros","rifle","river","roller_coaster","rollerskates","sailboat","sandwich","saw","saxophone","school_bus","scissors","scorpion","screwdriver","sea_turtle","see_saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping_bag","smiley_face","snail","snake","snorkel","snowflake","snowman","soccer_ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop_sign","stove","strawberry","streetlight","string_bean","submarine","suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis_racquet","tent","The_Eiffel_Tower","The_Great_Wall_of_China","The_Mona_Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor","traffic_light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin","washing_machine","watermelon","waterslide","whale","wheel","windmill","wine_bottle","wine_glass","wristwatch","yoga","zebra","zigzag"]
timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

random_number = Math.floor(Math.random()*quick_draw_data_set.length + 1);
console.log(quick_draw_data_set[random_number]);

sketch = quick_draw_data_set[random_number];
document.getElementById("original_sketch").innerHTML = "Sketch To Be Drawn : " + sketch;


function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}


function draw() {
    strokeWeight(10);
    stroke(0);

    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

check_sketch();
if(drawn_sketch == sketch) {
    answer_holder = "set";
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
}
}

function check_sketch() {
    timer_counter++;
    document.getElementById("time").innerHTML = "Timer: " + Math.ceil(timer_counter/75);
    console.log(timer_counter);
    if(timer_counter>1000) {
        timer_counter = 0;
        timer_check = "completed";
    }

    if(timer_check == "completed" || answer_holder == "set") {
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }


}

function updateCanvas() {
background("white");
random_number = Math.floor(Math.random()*quick_draw_data_set.length + 1);
sketch = quick_draw_data_set[random_number];
console.log(sketch);
document.getElementById("original_sketch").innerHTML = "Sketch To Be Drawn : " + sketch;


}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");

}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
if(error) {
    console.error(error);
}

console.log(results);
drawn_sketch = results[0].label;
document.getElementById("your_sketch").innerHTML = "Your Sketch: " + drawn_sketch;
document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%"

utterThis = new SpeechSynthesisUtterance(results[0].label);
synth.speak(utterThis);
}