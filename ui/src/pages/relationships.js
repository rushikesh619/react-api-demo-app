import React, { useState, useEffect } from 'react';
import MeterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Container, Link, Button } from '@material-ui/core/'
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    height: "100%",
    background: "linear-gradient(45deg, #FE6888 30%, #FF8E53 90%)",
  },
  table: {
    minWidth: 700,
  },
  Button: {

  }
});

function Relationship() {
  const [relations, setRelations] = useState([])
  useEffect(() => {
    axios.get('/api/relationship/getRelations').then((res) => {
      console.log(res);
      setRelations(res.data.relationship)
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const columns = [
    {
      title: 'First Person', field: 'firstPerson'
    },
    {
      title: 'Second Person', field: 'secondPerson'
    },
    {
      title: 'Relation', field: 'relation'
    },
    {
      title: 'Conclusion', field: 'conclusion'
    }
  ]
  const classes = useStyles();

  const saveData = () => {
    const data = relations;
    axios.post('/api/relationship/saveData', data)
      .then(response => {
        console.log(response.data);
        if (response.data.success === true) {
          alert("todos saved successfully");
        } else {
          alert("todos not saved");
        }
      }).catch(error => {
        alert(error);
      });
  }

  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Typography variant="h2" align='center' gutterBottom >
          Relationship App
        </Typography>
        <Typography variant="h4" align='center' gutterBottom >
          To demonstrate the usage of material table, UI and rest-api
        </Typography>
        <Typography variant="h5" align='center' gutterBottom >
          Developers Info
          <Link href="http://rushikesh619.github.io/" >
            http://rushikesh619.github.io/
          </Link>
        </Typography>
        <Typography align='center' gutterBottom >
          <Button color='primary' variant='contained' onClick={saveData}>
            Save your data
          </Button>
        </Typography>
        <MeterialTable
          title='Relationship Table'
          data={relations}
          columns={columns}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                console.log(newData);
                const temp = {
                  firstPerson: newData.firstPerson,
                  relation: newData.relation,
                  secondPerson: newData.secondPerson,
                  conclusion: `${newData.firstPerson} is ${newData.secondPerson}'s ${newData.relation}`
                }
                setTimeout(() => {
                  setRelations([...relations, temp]);

                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...relations];
                  const index = oldData.tableData.id;
                  const temp = {
                    firstPerson: newData.firstPerson,
                    relation: newData.relation,
                    secondPerson: newData.secondPerson,
                    conclusion: `${newData.firstPerson} is ${newData.secondPerson}'s ${newData.relation}`
                  }
                  dataUpdate[index] = temp;
                  setRelations([...dataUpdate]);

                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...relations];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setRelations([...dataDelete]);

                  resolve()
                }, 1000)
              }),
          }}
        />
      </Container>
    </div>
  )
}
export default Relationship

