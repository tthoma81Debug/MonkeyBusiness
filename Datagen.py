import random
#Generate default data



#default pos
#the parameters are for the desired window size
def datagen(winX, winY):
    #default monkey starting Area
    area=2
    #default positions, this doesn't really matter now, I'm just defining them now to not run into problems later
    #pos, is the location of the 'monkey' on-screen
    pos=[winX,winY]
    #AppendPs, is the position of the 'monkey' on-screen, followed by an integer representing what half of the screen the monkey is on.
    AppendPos=[winX,winY,area]
    #move, is a boolean that will be used to determine whether or not our fake-mokney has moved
    move=False
    #create output array
    output=[]
    #create %chance for monkey to move, 100 means there is a 1 in 100 chance the monkey will be in a different spot each second
    chance=100
    roll=0
    #loop begin
    #86400 is the number of seconds in a day, so i figured I should have 1 datapoint for each second.
    for i in range(86400):
        #roll chance for monkey to move
        roll=random.randrange(0,chance)
        if roll==chance-1:
            move=True
        #if the monkey moves, where does it move to
        if move==True:
            pos=[random.randrange(0,winX),random.randrange(0,winY)]
            #calculate datapos with which half of the screen the monkey is on
            if pos[0]>=winX/2:
                AppendPos=[pos[0],pos[1],2]
            else:
                AppendPos=[pos[0],pos[1],1]
        #reset move boolean
        move=False  
        #append our datapoint to the output array
        output.append(AppendPos)
    #loop terminate

    #print array
    for x in range(86400):
        print(output[x])
    #return data
    return(output)
