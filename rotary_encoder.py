#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time
from sys import version_info

if version_info.major == 3:
	raw_input = input

# Set up pins
# Rotary A Pin
RoAPin = 17
# Rotary B Pin
RoBPin = 18
# Rotary Switch Pin
RoSPin = 27

def print_message():
	print ("Rotary encoder read is running...")

def setup():
	# value to track position of scroll
	global counter

	# for tracking changes
	global Last_RoB_Status, Current_RoB_Status
	
	# initialise pins
	GPIO.setmode(GPIO.BCM)
	GPIO.setup(RoAPin, GPIO.IN)
	GPIO.setup(RoBPin, GPIO.IN)
	GPIO.setup(RoSPin,GPIO.IN, pull_up_down=GPIO.PUD_UP)
	
	# Set up a falling edge detect ISR to callback clear
	GPIO.add_event_detect(RoSPin, GPIO.FALLING, callback=clear)

	counter = 0
	Last_RoB_Status = 0
	Current_RoB_Status = 0

# Function to deal with rotary encoder changes
def rotaryDeal():
	global counter
	global Last_RoB_Status, Current_RoB_Status

	flag = 0
	Last_RoB_Status = GPIO.input(RoBPin)

	# When RoAPin level changes
	while(not GPIO.input(RoAPin)):
		Current_RoB_Status = GPIO.input(RoBPin)
		flag = 1
	if flag == 1:

		# Reset flag
		flag = 0

		# scroll up detected
		if (Last_RoB_Status == 0) and (Current_RoB_Status == 1):
			counter = counter + 1
			print("UP")
		
		# scroll down detected
		if (Last_RoB_Status == 1) and (Current_RoB_Status == 0):
			counter = counter - 1
			print("DOWN")
		print ("counter = %d" % counter)

# callback function to run when a button press is detected
def clear(ev=None):
	global counter
	counter = 0
	print("PRESS")

def main():
	print_message()
	while True:
		rotaryDeal()

def destroy():
	# Release resource
	GPIO.cleanup()  

# If run this script directly, do:
if __name__ == '__main__':
	setup()
	try:
		main()
	# When 'Ctrl+C' is pressed, the child program 
	# destroy() will be  executed.
	except KeyboardInterrupt:
		destroy()