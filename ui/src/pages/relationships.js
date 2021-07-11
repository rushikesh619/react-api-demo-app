import React, { useState, useEffect } from 'react';
import MeterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Link, Button, TextField, Select, MenuItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core/'
import axios from 'axios';

const Relate = ["brother", "sister", "father", "mother", "brother in law", "sister in law", "father in law", "mother in law", "son", "daughter", "nephew", "niece", "grand Father", "grand Mother", "Uncle", "aunty"];

const useStyles = makeStyles({
  root: {
    height: "100%",
    background: "linear-gradient(45deg, #FE6888 30%, #FF8E53 90%)",
  },
  table: {
    minWidth: 700,
  },
});

function Relationship() {
  const [relations, setRelations] = useState([]);
  const [persons, setPersons] = useState([]);
  const [person1, setPerson1] = useState([]);
  const [person2, setPerson2] = useState([]);
  useEffect(() => {
    axios.get('/api/relationship/getRelations').then((res) => {
      console.log(res);
      setRelations(res.data.relationship);
      console.log(res.data.persons);
      let temp = [];
      const peoples = res.data.persons;
      console.log(peoples);
      peoples.forEach(element => {
        let name = element.name;
        temp.push(name);
      });
      console.log(temp);
      setPersons(temp);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const columns = [
    {
      title: 'First Person',
      field: 'firstPerson',
      editComponent: ({ value, onRowDataChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onRowDataChange({
              ...rowData,
              firstPerson: (event.target.value) ?? "",
            });
          }}
        >
          {persons.map((person) => (
            <MenuItem key={person} value={person}>
              {person}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      title: 'Second Person',
      field: 'secondPerson',
      editComponent: ({ value, onRowDataChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onRowDataChange({
              ...rowData,
              secondPerson: (event.target.value) ?? "",
            });
          }}
        >
          {persons.map((person) => (
            <MenuItem key={person} value={person}>
              {person}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      title: 'Relation', field: 'relation',
      editComponent: ({ value, onRowDataChange, rowData }) => (
        <Select
          value={value}
          onChange={(event) => {
            onRowDataChange({
              ...rowData,
              relation: (event.target.value) ?? "",
            });
          }}
        >
          {Relate.map((relation) => (
            <MenuItem key={relation} value={relation}>
              {relation}
            </MenuItem>
          ))}
        </Select>
      ),
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
          alert("data saved successfully");
        } else {
          alert("data not saved");
        }
      }).catch(error => {
        alert(error);
      });
  }

  const handleChange1 = (event) => {
    setPerson1(event.target.value);
  };
  const handleChange2 = (event) => {
    setPerson2(event.target.value);
  };

  const addPerson = () => {
    const newItem = document.getElementById("activity").value;
    const temp = {
      name: newItem
    }
    axios.post('/api/relationship/addPersons', temp)
      .then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

  const degreeOfRelation = async () => {
    const data = [person1, person2];
    await axios.post('/api/relationship/degreeOfRelation', data)
      .then(response => {
        console.log(response.data.result);
        const result = response.data.result;
        if (result.length >= 1) {
          alert(response.data.result);
        }
        if (result == false) {
          alert('persons dont have any relation')
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
          Developers Info :-
          <Link href="http://rushikesh619.github.io/" >
            http://rushikesh619.github.io/
          </Link>
        </Typography>
      </Container>
      <Container>
        <Typography align='center' gutterBottom>
          Add persons to the system from here:
          <form>
            <TextField id="activity" label='Persons' variant='outlined' />
            <div>
              <Button variant="contained" color="primary" onClick={addPerson}>
                submit
              </Button>
            </div>
          </form>
        </Typography>
      </Container>
      <Container maxWidth='md'>
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
      <Container>
        <Typography align='center' gutterBottom>
          Select Peoples you want to see relationship between:
          <form>
            <TextField
              id="standard-select-currency"
              select
              label="person 1"
              value={person1}
              onChange={handleChange1}
              helperText="Please select person 1"
            >
              {persons.map((e) => (
                <MenuItem value={e}>
                  {e}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              select
              label="person 2"
              value={person2}
              onChange={handleChange2}
              helperText="Please select person 2"
            >
              {persons.map((e) => (
                <MenuItem value={e}>
                  {e}
                </MenuItem>
              ))}
            </TextField>
            <div>
              <Button variant="contained" color="primary" onClick={degreeOfRelation}>
                submit
              </Button>
            </div>
          </form>
        </Typography>
      </Container>
    </div>
  )
}
export default Relationship

