import * as React from 'react';
import { View } from 'react-native';
import {Button, Card} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
const TaskCard = ({key, taskId, title, theme,taskList,addtask,openModal}) => {
  const {colors} = theme;
  
  const RightContent = props => (
    <Button
      color={colors.accent}
      dark={true}
      mode="contained"
      onPress={()=>openModal(taskId)}>
      {' '}
      Add Task{' '}
    </Button>
  );

  return (
    <View style={{display:"flex",padding:1}}>
    <Card style={{marginTop: 5,padding:12}} key={key}>
      <Card.Title title={title} right={RightContent} />
      <Card.Content>
        {taskList.length>0 && taskList.map((el)=>{
          return <Card>
              <Card.Title title={el} />  
          </Card>
        })}
      </Card.Content>
    </Card>
    </View>
    
  );
};

export default withTheme(TaskCard);
