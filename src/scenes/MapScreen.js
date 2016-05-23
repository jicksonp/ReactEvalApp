import React from 'react';

import {
  Component,
  View,
  Text,
  ProgressBarAndroid as ProgressBar,
  StyleSheet,
} from 'react-native';

import {
    Card,
} from 'react-native-material-design';

import * as GLOBAL from '../utils/Globals';
import NetworkImageView from '../components/NetworkImageView';

const styles = StyleSheet.create({
    container: {
        backgroundColor: GLOBAL.COLOR.BACKGROUND,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
    },
    card_container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        justifyContent: 'center',
    },
    profile: {
        width: 200,
        height: 200,
        marginBottom: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
        color: GLOBAL.COLOR.PRIMARY_TEXT,
    },
    handle: {
        fontSize: 14,
        fontWeight: '300',
        color: GLOBAL.COLOR.SECONDARY_TEXT,
    },
    email: {
        fontSize: 16,
        fontWeight: '400',
        color: GLOBAL.COLOR.PRIMARY_TEXT,
    },
    follower_container: {
        flexDirection: 'row',
        marginTop: 16,
    }
});

class MapScreen extends Component {

    constructor(props, context) {
        super(props, context);
        this.github_username = 'mojombo';
        this.github_url = 'https://api.github.com/users/';

        this.state = {
            user: null,
            isLoaded: null,
        };
    }


    componentDidMount() {
        // TODO Move this to container later
        //this.fetchUserData();
    }

    fetchUserData() {
        const REQUEST_URL = this.github_url + this.github_username;
        global.LOG('REQUEST_URL',REQUEST_URL);

        // TODO do error handling
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    user: responseData,
                    isLoaded: true,
                })
            })
            .done();
    }
    // {
    //   "login": "jicksonp",
    //   "id": 16488048,
    //   "avatar_url": "https://avatars.githubusercontent.com/u/16488048?v=3",
    //   "gravatar_id": "",
    //   "url": "https://api.github.com/users/jicksonp",
    //   "html_url": "https://github.com/jicksonp",
    //   "followers_url": "https://api.github.com/users/jicksonp/followers",
    //   "following_url": "https://api.github.com/users/jicksonp/following{/other_user}",
    //   "gists_url": "https://api.github.com/users/jicksonp/gists{/gist_id}",
    //   "starred_url": "https://api.github.com/users/jicksonp/starred{/owner}{/repo}",
    //   "subscriptions_url": "https://api.github.com/users/jicksonp/subscriptions",
    //   "organizations_url": "https://api.github.com/users/jicksonp/orgs",
    //   "repos_url": "https://api.github.com/users/jicksonp/repos",
    //   "events_url": "https://api.github.com/users/jicksonp/events{/privacy}",
    //   "received_events_url": "https://api.github.com/users/jicksonp/received_events",
    //   "type": "User",
    //   "site_admin": false,
    //   "name": "Jickson P",
    //   "company": "Peppertap",
    //   "blog": null,
    //   "location": "Gurgaon,India",
    //   "email": "jicksonstephen@gmail.com",
    //   "hireable": null,
    //   "bio": null,
    //   "public_repos": 4,
    //   "public_gists": 0,
    //   "followers": 1,
    //   "following": 6,
    //   "created_at": "2015-12-30T10:45:35Z",
    //   "updated_at": "2016-05-05T09:31:27Z"
    // }
    render() {
        return (
            <View><Text>Hello world</Text></View>
        )
    }
}

export default MapScreen;
