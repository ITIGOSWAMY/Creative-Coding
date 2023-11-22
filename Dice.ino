int Button = 2;

int bottomLeftLED = 3;
int middleLeftLED = 4;
int upperLeftLED = 5;
int middleLED = 6;
int bottomRightLED = 7;
int middleRightLED = 8;
int upperRightLED = 9;

int buttonState;

long ran;
int delayTime = 1000;

bool hasRun = false; 

void setup() {
  
  pinMode(bottomLeftLED, OUTPUT);
  pinMode(middleLeftLED, OUTPUT);
  pinMode(upperLeftLED, OUTPUT);
  pinMode(middleLED, OUTPUT);
  pinMode(bottomRightLED, OUTPUT);
  pinMode(middleRightLED, OUTPUT);
  pinMode(upperRightLED, OUTPUT);

  pinMode(Button, INPUT);

  Serial.begin(9600);

  randomSeed(analogRead(0));

}

  void runFunction() {
    
    ran = random(1, 7);
  
    Serial.print(ran);
    Serial.println("Button Pressed");

    if (ran == 1) {
      digitalWrite(middleLED, HIGH);
      delay(delayTime);
    }
    if (ran == 2) {
      digitalWrite(bottomRightLED, HIGH);
      digitalWrite(upperLeftLED, HIGH);
      delay(delayTime);
    }
    if (ran == 3) {
      digitalWrite(upperLeftLED, HIGH);
      digitalWrite(middleLED, HIGH);
      digitalWrite(bottomRightLED, HIGH);
      delay(delayTime);
     }
     if (ran == 4) {
      digitalWrite(upperLeftLED, HIGH);
      digitalWrite(bottomLeftLED, HIGH);
      digitalWrite(upperRightLED, HIGH);
      digitalWrite(bottomRightLED, HIGH);
      delay(delayTime);
     }
     if (ran == 5) {
      digitalWrite(upperLeftLED, HIGH);
      digitalWrite(bottomLeftLED, HIGH);
      digitalWrite(middleLED, HIGH);
      digitalWrite(upperRightLED, HIGH);
      digitalWrite(bottomRightLED, HIGH);
      delay(delayTime);
     }
     if (ran == 6) {
      digitalWrite(bottomLeftLED, HIGH);
      digitalWrite(middleLeftLED, HIGH);
      digitalWrite(upperLeftLED, HIGH);
      digitalWrite(bottomRightLED, HIGH);
      digitalWrite(middleRightLED, HIGH);
      digitalWrite(upperRightLED, HIGH);
      delay(delayTime);
      }
    
    digitalWrite(bottomLeftLED, LOW);
    digitalWrite(middleLeftLED, LOW);
    digitalWrite(upperLeftLED, LOW);
    digitalWrite(middleLED, LOW);
    digitalWrite(bottomRightLED, LOW);
    digitalWrite(middleRightLED, LOW);
    digitalWrite(upperRightLED, LOW);
    
    hasRun = true;
  }

  void loop() {

  buttonState = digitalRead(Button);

  if (buttonState == LOW && !hasRun) {
    runFunction();
  } else if (buttonState == HIGH) {
    hasRun = false;

    Serial.println("Button Nuetral");

    delay(50);
  }
}


  



