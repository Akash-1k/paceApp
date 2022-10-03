import React, { useState, useRef, useEffect } from 'react';

// import all the components we are going to use
import { ActivityIndicator, BackHandler, Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

//Import React Native Video to play video
import Video from 'react-native-video';

//Media Controls to control Play/Pause/Seek and full screen
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';
import { connect } from 'react-redux';
import { setIsStatusBar, setPlayVideoDetails } from '../modules/Workout/actions';
import Config from '../constants/Config';
import Colors from '../constants/Colors';
import Orientation from 'react-native-orientation';

const VideoPlayer = (props) => {
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [buffering, setBuffring] = useState(false);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('contain');


    useEffect(() => {
        Orientation.lockToLandscape()
        props.setIsStatusBar(true)
    }, [])


    function handleBackButtonClick() {
        Orientation.lockToPortrait()
        props.setIsStatusBar(false)
        props.navigation.goBack();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const hitApiAfterVideoEnd = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + props.loginData.token);

        var formdata = new FormData();
        formdata.append("workout_id", props.playVideoDetails.workout_id);
        formdata.append("workout_video_id", props.playVideoDetails.id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(Config.BASE_URL + Config.viewed_workouts_video, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status == 2) {
                    navigation.navigate('CongratulationsWorkout')
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    const onSeek = (seek) => {
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        onReload()
        hitApiAfterVideoEnd()
    }

    const onReload = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        videoPlayer.current.seek(0);
    }

    const onFullScreen = () => {
        if (isFullScreen == true) {
            Orientation.lockToPortrait()
            setIsFullScreen(false);
            setScreenType('contain');
        } else {
            setIsFullScreen(true);
            Orientation.lockToLandscape()
            setScreenType('cover');
        }
    };

    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    const onBuffer = ({ isBuffering }) => {
        console.log('isBuffering::', isBuffering);
        setBuffring(isBuffering)
    }

    return (
        <View style={{
            width: "100%",
            height: "100%",
        }}>
            <StatusBar hidden={props.isStatusBar} />
            <Video
                onBuffer={onBuffer}
                onEnd={onEnd}
                onLoad={onLoad}
                controls
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                useTextureView={false}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode={screenType}
                onFullScreen={isFullScreen}
                // source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }}
                source={{ uri: Config.IMAGE_BASE_URL + 'workout_vid/' + props.playVideoDetails.video_url }}
                style={[{
                    backgroundColor: Colors.fontColor
                }, StyleSheet.absoluteFill]}
                volume={10}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                }}
            />
            <MediaControls
                duration={duration}
                isLoading={isLoading}
                mainColor="#333"
                onFullScreen={onFullScreen}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                playerState={playerState}
                progress={currentTime}
                toolbar={renderToolbar()}

            />
            {
                buffering ?
                    <View style={[{ position: "absolute", alignItems: 'center', justifyContent: 'center', elevation: 10, zIndex: 10 }, StyleSheet.absoluteFill]} >
                        <ActivityIndicator animating size={'large'} color={Colors.PrimaryColor} />
                    </View> : null
            }

        </View >
    );
};




const mapStateToProps = (state) => ({
    loginData: state.loginReducer.loginData,
    userDetails: state.profileReducer.userDetails,
    playVideoDetails: state.workoutReducer.playVideoDetails,
    isStatusBar: state.workoutReducer.isStatusBar,
});

const mapDispatchToProps = (dispatch) => ({
    setPlayVideoDetails: (data) => dispatch(setPlayVideoDetails(data)),
    setIsStatusBar: (data) => dispatch(setIsStatusBar(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);


const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },

});