import {
  VideoTileGrid,
  useMeetingManager,
  CameraSelection,
  QualitySelection,
  MicSelection,
  SpeakerSelection,
  useLocalVideo,
  useContentShareControls,
  ControlBar,
  ControlBarButton,
  Microphone,
  Camera,
  Phone,
  Laptop,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import { CButton, CContainer, CRow, CCol, CForm, CFormGroup, CLabel, CInput, CFormText, CTooltip } from '@coreui/react';

import React from 'react';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MyApp = () => {
  const { t } = useTranslation();

  const auth = useSelector((state) => state.auth);
  const groupName = auth.group_name;
  const accessToken = auth.access_token;

  const meetingManager = useMeetingManager();
  const [isJoinedToMettingSession, setJoinedToMettingSession] = React.useState(false);
  const [currentAttendeeId, setCurrentAttendeeId] = React.useState();
  const [currentMeetingId, setCurrentMettingId] = React.useState();
  const [meetingId, setMeetingID] = React.useState();
  const [meetingName, setMeetingName] = React.useState();
  const { toggleVideo } = useLocalVideo();
  const { toggleContentShare } = useContentShareControls();

  const sendJoinRequest = async (joinData) => {
    // Use the join API to create a meeting session
    await meetingManager.join(joinData);

    // At this point you can let users setup their devices, or start the session immediately
    await meetingManager.start();
  };

  const sendEndRequest = async (joinData) => {
    // Use the join API to create a meeting session
    // await meetingManager.join(joinData);

    // At this point you can let users setup their devices, or start the session immediately
    await meetingManager.leave();
  };

  // const handleChange = async (event) => {
  //     console.log(event.target.value);
  // }
  const joinMeeting = async () => {
    // Fetch the meeting and attendee data from your server
    //   const data = await response.json();
    const requestsBody = { meeting_id: meetingId };
    await axios
      .post(`${config.rest.joinMeeting()}`, requestsBody, {
        headers: {
          'content-type': 'application/json',
          Authorization: accessToken,
        },
      })
      .then((res) => {
        const responseData = res.data;
        if (responseData.code === 200 && responseData.message.id === '102') {
          console.log(responseData);
          const joinData = {
            meetingInfo: responseData.data.JoinInfo.Meeting,
            attendeeInfo: responseData.data.JoinInfo.Attendee,
          };
          setCurrentAttendeeId(responseData.data.JoinInfo.Attendee.AttendeeId);
          setCurrentMettingId(responseData.data.JoinInfo.Meeting.MeetingId);
          sendJoinRequest(joinData);
          setJoinedToMettingSession(true);
        }
      });
  };

  const createMeeting = async () => {
    // Fetch the meeting and attendee data from your server
    //   const data = await response.json();
    const requestsBody = { external_id: meetingName, region: 'us-east-1' };
    await axios
      .post(`${config.rest.createMeeting()}`, requestsBody, {
        headers: {
          'content-type': 'application/json',
          Authorization: accessToken,
        },
      })
      .then((res) => {
        const responseData = res.data;
        if (responseData.code === 200 && responseData.message.id === '100') {
          console.log(responseData);
          const joinData = {
            meetingInfo: responseData.data.JoinInfo.Meeting,
            attendeeInfo: responseData.data.JoinInfo.Attendee,
          };
          setCurrentAttendeeId(responseData.data.JoinInfo.Attendee.AttendeeId);
          setCurrentMettingId(responseData.data.JoinInfo.Meeting.MeetingId);
          sendJoinRequest(joinData);
          setJoinedToMettingSession(true);
        }
      });
  };

  const endMeeting = async () => {
    // Fetch the meeting and attendee data from your server
    //   const data = await response.json();
    await axios
      .delete(`${config.rest.endMetting()}?meeting_id=${currentMeetingId}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: accessToken,
        },
      })
      .then((res) => {
        const responseData = res.data;
        if (responseData.code === 200 && responseData.message.id === '107') {
          setCurrentAttendeeId('');
          setCurrentMettingId('');
          sendEndRequest();
          setJoinedToMettingSession(false);
        }
      });
  };

  const leaveMeeting = async () => {
    // Fetch the meeting and attendee data from your server
    //   const data = await response.json();
    const requestsBody = { meeting_id: currentMeetingId, attendee_id: currentAttendeeId };
    await axios
      .post(`${config.rest.leaveMetting()}`, requestsBody, {
        headers: {
          'content-type': 'application/json',
          Authorization: accessToken,
        },
      })
      .then((res) => {
        // const responseData = res.data;
        // if (responseData.code === 200 && responseData.message.id === 107) {

        // }
        setCurrentAttendeeId('');
        setCurrentMettingId('');
        sendEndRequest();
        setJoinedToMettingSession(false);
      });
  };

  const [muted, setMuted] = React.useState(false);
  const [cameraActive, setCameraActive] = React.useState(false);
  const [screenShare, setScreenShare] = React.useState(false);
  const [recording, setRecording] = React.useState(false);

  const microphoneButtonProps = {
    icon: muted ? <Microphone muted /> : <Microphone />,
    onClick: () => setMuted(!muted),
  };

  const cameraButtonProps = {
    icon: cameraActive ? <Camera /> : <Camera disabled />,
    // popOver: [
    //   {
    //     onClick: () => console.log('camera popover option 1'),
    //     children: <span>Some option text</span>,
    //   },
    //   {
    //     onClick: () => console.log('camera popover option 2'),
    //     children: <span>More option text</span>,
    //   },
    // ],
    onClick: () => {
      setCameraActive(!cameraActive);
      toggleVideo();
    },
  };

  // const dialButtonProps = {
  //   icon: <Dialer />,
  //   onClick: () => console.log('Toggle dial pad'),
  // };

  const hangUpButtonProps = {
    icon: <Phone />,
    onClick: () => leaveMeeting(),
  };

  // const volumeButtonProps = {
  //   icon: <Sound />,
  //   onClick: () => {},
  //   popOver: [
  //     {
  //       onClick: () => console.log('volume popover option 1'),
  //       children: <span>Some option text</span>,
  //     },
  //     {
  //       onClick: () => console.log('volume popover option 2'),
  //       children: <span>More option text</span>,
  //     },
  //   ],
  // };

  const showParticipants = {
    icon: <i className="fas fa-users"></i>,
    onClick: () => console.log('minkychu'),
  };

  const startRecording = !recording ? (
    <span>
      <i className="fas fa-record-vinyl"></i> {t('start-recording')}
    </span>
  ) : (
    <span>
      <i disabled className="fas fa-record-vinyl"></i> {t('stop-recording')}
    </span>
  );

  const comment = {
    icon: <i className="fas fa-comments"></i>,
    onClick: () => console.log('minkychu'),
  };

  const moreAction = {
    icon: <i className="fas fa-ellipsis-h"></i>,
    onClick: () => {},
    popOver: [
      {
        onClick: () => setRecording(!recording),
        children: startRecording,
      },
    ],
  };

  // const moreAction = (
  //   <PopOver a11yLabel="Click me">
  //     <PopOverItem onClick={setRecording(!recording)} children={startRecording} />
  //   </PopOver>
  // );

  const laptopButtonProps = {
    icon: <Laptop />,
    onClick: () => {
      toggleContentShare();
      setScreenShare(!screenShare);
    },
  };

  return (
    <>
      <VideoTileGrid />
      <CContainer>
        <CRow>
          <CCol className="text-center">
            <MeetingProvider>
              <ControlBar
                showLabels={false}
                layout="undocked-horizontal"
                css="margin: 0 auto"
                className="wraper__bar--button"
              >
                <CTooltip content={t('show-participants')} placement="bottom">
                  <ControlBarButton {...showParticipants} />
                </CTooltip>

                <CTooltip content={t('show-conversation')} placement="bottom">
                  <ControlBarButton {...comment} />
                </CTooltip>

                <CTooltip content={t('more-actions')} placement="bottom">
                  <ControlBarButton {...moreAction} />
                </CTooltip>

                <CTooltip content={cameraActive ? t('turn-camera-off') : t('turn-camera-on')} placement="bottom">
                  <ControlBarButton {...cameraButtonProps} />
                </CTooltip>

                <CTooltip content={muted ? t('unmute') : t('mute')} placement="bottom">
                  <ControlBarButton {...microphoneButtonProps} />
                </CTooltip>

                <CTooltip content={screenShare ? 'Stop sharing' : t('screen-sharing')} placement="bottom">
                  <ControlBarButton {...laptopButtonProps} />
                </CTooltip>

                {groupName === 'user' && (
                  <CTooltip content={t('leave')} placement="bottom">
                    <ControlBarButton {...hangUpButtonProps} label={t('leave')} />
                  </CTooltip>
                )}
                {groupName === 'nurse' && (
                  <CTooltip content={t('end')} placement="bottom">
                    <ControlBarButton {...hangUpButtonProps} label={t('end')} />
                  </CTooltip>
                )}
              </ControlBar>
            </MeetingProvider>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg="12" className="py-3">
            <CForm action="" method="post">
              {groupName === 'user' && (
                <CFormGroup>
                  <CLabel htmlFor="nf-email">{t('meeting-id')}</CLabel>
                  <CInput
                    type="text"
                    id="nf-email"
                    name="nf-email"
                    placeholder={t('enter-meeting-id')}
                    disabled={isJoinedToMettingSession}
                    onChange={(value) => setMeetingID(value.target.value)}
                  />
                  <CFormText className="help-block">{}</CFormText>
                  <CButton
                    key="success-lg"
                    color="success"
                    size="sm"
                    className="m-2 center"
                    disabled={isJoinedToMettingSession}
                    onClick={joinMeeting}
                  >
                    {t('join-meeting')}
                  </CButton>
                </CFormGroup>
              )}
              {groupName === 'nurse' && (
                <CFormGroup>
                  <CLabel htmlFor="nf-email">{t('meeting-name')}</CLabel>
                  <CInput
                    type="text"
                    id="nf-mettings-name"
                    name="nf-mettings-name"
                    placeholder={t('enter-meeting-name')}
                    disabled={isJoinedToMettingSession}
                    onChange={(value) => setMeetingName(value.target.value)}
                  />
                  <CFormText className="help-block">{t('meeting-name-is-required-when')}</CFormText>
                  <CButton
                    key="success-create-lg"
                    color="success"
                    size="sm"
                    className="m-2 center"
                    disabled={isJoinedToMettingSession}
                    onClick={createMeeting}
                  >
                    {t('create-a-meeting')}
                  </CButton>
                </CFormGroup>
              )}
            </CForm>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg="6" className="py-3">
            <CameraSelection />
            <QualitySelection />
          </CCol>
          <CCol lg="6" className="py-3">
            <MicSelection />
            <SpeakerSelection />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <span>
              {t('current-meeting-id')}: {currentMeetingId}
            </span>
          </CCol>
          <CCol>
            <span>
              {t('current-meeting-id')}: {currentAttendeeId}
            </span>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg="12" className="py-3">
            <CButton
              key="success-toggle-lg"
              color="success"
              size="lg"
              className="m-2 center"
              disabled={!isJoinedToMettingSession}
              onClick={toggleVideo}
            >
              {t('toggle-video')}
            </CButton>
            <CButton
              key="success-toggle-content-share-lg"
              color="success"
              size="lg"
              className="m-2 center"
              disabled={!isJoinedToMettingSession}
              onClick={toggleContentShare}
            >
              {t('toggle-content-share')}
            </CButton>
            {groupName === 'user' && (
              <CButton
                key="success-toggle-leave-lg"
                color="warning"
                size="lg"
                className="m-2 center"
                disabled={!isJoinedToMettingSession}
                onClick={leaveMeeting}
              >
                {t('leave-meeting')}
              </CButton>
            )}
            {groupName === 'nurse' && (
              <CButton
                key="error-toggle-end-lg"
                color="danger"
                size="lg"
                className="m-2 center"
                disabled={!isJoinedToMettingSession}
                onClick={endMeeting}
              >
                {t('end-meeting')}
              </CButton>
            )}
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default MyApp; // Don’t forget to use export default!
