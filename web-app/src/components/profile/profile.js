import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const StyledProfile  = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
`

const StyledAccountBasics  = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledProfileSection  = styled.div`
    display: flex;
    flex-direction: column;
`

const SectionTitle = styled.span`
    display: flex;
    font-family: sans-serif;
    color: #333;
    font-size: 36px;
`

const StyledButton = styled(Button)`
    width: 15rem;
`

const StyledSelect = styled(Select)`
    margin: 10px 0;
`

const StyledRadioGroup = styled(RadioGroup)`
    display: flex;
    flex-direction: row;
`

const StyledProfileName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const AccountBasics = ({classes, account, onChange}) =>
    <StyledAccountBasics>
        <SectionTitle>Account Basics</SectionTitle>
        <TextField
          id="outlined-name"
          label={"Email Address"}
          className=""
          value={account.email}
          margin="normal"
          variant="outlined"
          onChange={(e)=>{
              onChange("email", e.target.value)
            }}
        />
        <StyledButton variant="contained" className="">
            Change Password
        </StyledButton>
        <StyledSelect
          value={account.language}
          onChange={(e)=>onChange("language", e.target.value)}
          name="Language"
          input={<OutlinedInput labelWidth={50} name="language" id="outlined-language-simple" />}
          inputProps={{
            id: 'sel-language',
          }}
          className=""
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </StyledSelect>
        <StyledSelect
          value={account.country}
          onChange={(e)=>{onChange("country", e.target.value)}}
          name="Country"
          input={<OutlinedInput labelWidth={50} name="age" id="outlined-age-simple" />}
          inputProps={{
            id: 'sel-country',
          }}
          className=""
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </StyledSelect>
        <StyledRadioGroup
          aria-label="Gender"
          name="gender"
          className={"gender"}
          value={account.gender}
          onChange={(e)=>onChange("gender", e.target.value)}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="custom" control={<Radio />} label="Other" />
        </StyledRadioGroup>
    </StyledAccountBasics>

const ProfileName = ({firstName, lastName, onChange})=>
    <StyledProfileName>
        <TextField
          id="outlined-name"
          label={"First Name"}
          className=""
          value={firstName}
          margin="normal"
          variant="outlined"
          onChange={(e)=>{
            onChange("first_name", e.target.value)
          }}
        />
        <TextField
          id="outlined-name"
          label={"Last Name"}
          className=""
          value={lastName}
          margin="normal"
          variant="outlined"
          onChange={(e)=>{
            onChange("last_name", e.target.value)
          }}
        />
    </StyledProfileName>  


const ProfileSection = ({firstName, lastName, aboutMe, onChange}) => 
    <StyledProfileSection>
        <SectionTitle>Profile</SectionTitle>
        <ProfileName firstName={firstName} lastName={lastName} onChange={onChange}/>
        <TextField
          id="outlined-name"
          label={"About You"}
          className=""
          value={aboutMe}
          onChange={(e)=>onChange("about_me", e.target.value)}
          margin="normal"
          variant="outlined"
          multiline={true}
        />
    </StyledProfileSection>


export default class Profile extends React.Component {
    constructor(){
        super();
        this.state = {
            accountBasics: {
                name:"",
                language: "none",
                country: "none",
                gender: undefined,
                email: ""
            },
            profile: {
                firstName: "",
                lastName:"",
                aboutMe:""
            }
        }
    }
    onChange(key, val){
        let newState = this.state;
        switch(key){
            case "about_me":{
                newState.profile.aboutMe = val;
                break;
            }
            case "first_name":{
                newState.profile.firstName = val;
                break;
            }
            case "last_name":{
                newState.profile.lastName = val;
                break;
            }
            case "gender":{
                newState.accountBasics.gender = val;
                break;
            }
            case "email":{
                newState.accountBasics.email = val;
                break;
            }
            case "language":{
                newState.accountBasics.language = val;
                break;
            }
            case "country":{
                newState.accountBasics.country = val;
                break;
            }
        }
        const x = {...newState};
        this.setState(x);
    }
    render(){
        return(
            <StyledProfile>
                <AccountBasics onChange={(key, val)=>this.onChange(key, val)} account={this.state.accountBasics} />
                <ProfileSection onChange={(key, val)=>this.onChange(key, val)} profile={this.state.profile} />
            </StyledProfile>
        );
    }
}
