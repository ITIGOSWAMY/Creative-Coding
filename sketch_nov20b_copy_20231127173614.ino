void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}


void loop() {
// put your main code here, to run repeatedly:
int potValue = analogRead(A0);
Serial.println("potentiometer");
Serial.println(potValue);

int photoValue = analogRead(A1);
Serial.println("photocell");
Serial.println(photoValue);

delay(100);
}
