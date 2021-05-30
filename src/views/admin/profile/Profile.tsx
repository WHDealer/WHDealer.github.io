import React, { useEffect, useRef, useState } from 'react';
import {
  CButton,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormGroup,
  CImg,
  CLabel,
  CSpinner,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../store/auth/actions';
import { Prompt, RouteComponentProps } from 'react-router-dom';
import { setUserLS } from '../../../utils';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import config from '../../../config';
import { Container } from '../../../theme/styles';
import styled from 'styled-components';
import { colors, spacing } from '../../../theme';
import logo from '../../admin/containers/logo.png';
import { ModalChangePassword } from './ModalChangePassword';
import { isEmpty } from 'lodash';
import axios from 'axios';

const Profile: React.FC<RouteComponentProps> = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const callApi = (payload: any, callback: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [firstName, setFirstName] = useState<string>(auth?.first_name || '');
  const [lastName, setLastName] = useState<string>(auth?.last_name || '');

  const [avatar, setAvatar] = useState<string>(auth?.avatar || '');

  const [isFetching, setIsFetching] = useState<any>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLastName, setLoadingLastName] = useState<boolean>(false);
  const [modal, setModal] = useState<any>(false);

  const firstNameInputRef = useRef<any>(null);
  const lastNameInputRef = useRef<any>(null);

  const [isVisiblePopupChangePassword, setIsVisiblePopupChangePassword] = useState(false);

  const [showEditFirstName, setShowEditFirstName] = useState(false);
  const [showEditLastName, setShowEditLastName] = useState<boolean>(false);

  const [errorFormMsg, setErrorFormMsg] = useState<{
    errorFirstNameMsg: string;
    errorLastNameMsg: string;
  }>({
    errorFirstNameMsg: '',
    errorLastNameMsg: '',
  });

  useEffect(() => {
    if (modal.show || showEditFirstName || showEditLastName) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [modal.show, showEditFirstName, showEditLastName]);

  // const addConfirmBeforeUnload = () => {
  //   setModal(true);
  // };
  // const removeConfirmBeforeUnload = () => {
  //   setModal(false);
  // };

  const updateAdminProfile = (fieldEdit: 'firstName' | 'lastName') => {
    const bodyData: any = {
      first_name: fieldEdit === 'firstName' ? firstName : auth?.first_name,
      last_name: fieldEdit === 'lastName' ? lastName : auth?.last_name,
    };
    setIsFetching(true);
    fieldEdit === 'firstName' ? setLoading(true) : setLoadingLastName(true);

    callApi(
      {
        method: 'put',
        api: config.rest.updateProfileAdmin(),
        body: bodyData,
      },
      (response) => {
        setIsFetching(false);
        setLoadingLastName(false);
        setLoading(false);
        const { status } = response;
        fieldEdit === 'firstName' ? setLoading(false) : setLoadingLastName(false);
        console.log(response);
        if (status === SUCCESS) {
          if (fieldEdit === 'firstName') {
            setShowEditFirstName(false);
            dispatch(
              updateProfile({
                first_name: firstName,
              }),
            );
            const newProfile = { ...auth, first_name: firstName };
            setUserLS(newProfile);
          } else {
            setShowEditLastName(false);

            dispatch(
              updateProfile({
                last_name: lastName,
              }),
            );
            const newProfile = { ...auth, last_name: lastName };
            setUserLS(newProfile);
          }
        }
      },
    );
  };

  const onCloseModalChangePassword = () => {
    setIsVisiblePopupChangePassword(false);
  };

  const onChangeFirstName = (value: string) => {
    setFirstName(value);
    if (isEmpty(value)) {
      setErrorFormMsg({
        ...errorFormMsg,
        errorFirstNameMsg: 'Please Enter First Name',
      });
    } else if (!isEmpty(value) && !value.match(/^[a-zßüÜöÖäÄ_][-\wßüÜöÖäÄ ]*$/i)) {
      setErrorFormMsg({
        ...errorFormMsg,
        errorFirstNameMsg: 'First Name InValid',
      });
    } else {
      setErrorFormMsg({
        ...errorFormMsg,
        errorFirstNameMsg: '',
      });
    }
  };

  const onChangeLastName = (value: string) => {
    setLastName(value);
    if (isEmpty(value)) {
      setErrorFormMsg({
        ...errorFormMsg,
        errorLastNameMsg: 'Please Enter Last Name',
      });
    } else if (!isEmpty(value) && !value.match(/^[a-zßüÜöÖäÄ_][-\wßüÜöÖäÄ ]*$/i)) {
      setErrorFormMsg({
        ...errorFormMsg,
        errorLastNameMsg: 'Last Name InValid',
      });
    } else {
      setErrorFormMsg({
        ...errorFormMsg,
        errorLastNameMsg: '',
      });
    }
  };

  const getTemporaryUploadLink = (selectedFile: any) => {
    const file: File = (selectedFile as FileList)[0];
    const fileName = file?.name;

    callApi(
      {
        method: 'get',
        api: config.rest.getUploadLink(fileName),
      },
      (response: any) => {
        if (response.status === SUCCESS) {
          uploadFile(response?.data?.link, response?.data?.avatar, file);
        }
      },
    );
  };

  const uploadFile = (linkUpload: string, linkAvatar: string, file: any) => {
    let reader = new FileReader();

    reader.readAsDataURL(file);

    var myHeaders = new Headers();
    myHeaders.append('x-amz-acl', 'public-read');

    var instance = axios.create();
    delete instance.defaults.baseURL;
    delete instance.defaults.headers.common['Authorization'];

    var config: any = {
      method: 'put',
      url: linkUpload,
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': file?.type,
      },
      data: file,
    };

    instance(config)
      .then(function (response) {
        console.log(JSON.stringify(response));
        dispatch(
          updateProfile({
            avatar: linkAvatar,
          }),
        );
        const newProfile = { ...auth, avatar: linkAvatar };
        setUserLS(newProfile);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const uploadRef = useRef<any>(null);

  return (
    <Container>
      <ModalChangePassword show={isVisiblePopupChangePassword} handleClose={onCloseModalChangePassword} />
      <div className="admin-profile">
        <div style={{ position: 'relative' }}>
          <CImg
            src={avatar || logo}
            alt="Avatar"
            style={{ borderWidth: 5, borderColor: colors.dim, borderStyle: 'solid', borderRadius: 100 }}
            width="128"
            height="128"
          />
          <CButton
            onClick={() => {
              uploadRef.current?.click();
            }}
            style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.gray3, borderRadius: 20 }}
          >
            <CIcon name="cil-camera" width="20px" height="20px" />
          </CButton>
          <input
            className="avatar-user--input"
            type="file"
            id="myFile"
            name="filename"
            ref={uploadRef}
            style={{ display: 'none' }}
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(event: any) => {
              getTemporaryUploadLink(event?.target?.files);
              const file: File = (event?.target?.files as FileList)[0];
              setAvatar(URL.createObjectURL(file));
            }}
          />
        </div>

        <FullName>
          {auth.first_name} {auth.last_name}
        </FullName>
        <CButton
          color="info"
          onClick={() => {
            setIsVisiblePopupChangePassword(true);
          }}
          style={{ marginTop: spacing[3] }}
        >
          Change password
        </CButton>
      </div>

      <ContentContainer>
        <Title>Personal profile</Title>
        {showEditFirstName && <Prompt when={true} message="Changes you made may not be saved." />}
        <CFormGroup>
          <CLabel>First name</CLabel>
          <CInputGroup>
            <CInput
              disabled={!showEditFirstName}
              maxLength={50}
              onChange={(e: any) => {
                if (!e.target.value.includes(' ') && config.validate.valueTypingExpressionsName(e)) {
                  onChangeFirstName(e.target.value);
                }
              }}
              innerRef={firstNameInputRef}
              value={firstName}
              invalid={firstName.trim() === ' '}
            />
            <CInputGroupPrepend style={{ cursor: 'pointer' }}>
              <CInputGroupText
                onClick={async () => {
                  await setShowEditFirstName(true);
                  await firstNameInputRef?.current?.focus?.();
                }}
              >
                <CIcon name={'cil-pencil'} />
              </CInputGroupText>
            </CInputGroupPrepend>
          </CInputGroup>
          {errorFormMsg?.errorFirstNameMsg && <ErrorMessage>{errorFormMsg?.errorFirstNameMsg}</ErrorMessage>}
          {showEditFirstName && (
            <RowButtonContainer>
              <CancelButton
                disabled={isFetching}
                onClick={() => {
                  setShowEditFirstName(false);
                  setErrorFormMsg({
                    ...errorFormMsg,
                    errorFirstNameMsg: '',
                  });
                  setFirstName(auth?.first_name);
                }}
              >
                Cancel
              </CancelButton>

              <SaveButton
                disabled={!firstName && !loading}
                onClick={() => updateAdminProfile('firstName')}
                color="info"
              >
                {loading ? <CSpinner size="sm" color="light" /> : 'Save'}
              </SaveButton>
            </RowButtonContainer>
          )}
        </CFormGroup>
        {showEditLastName && <Prompt when={true} message="Changes you made may not be saved." />}
        <CFormGroup>
          <CLabel>Last name</CLabel>
          <CInputGroup>
            <CInput
              disabled={!showEditLastName}
              maxLength={50}
              innerRef={lastNameInputRef}
              onChange={(e: any) => {
                if (!e.target.value.includes(' ') && config.validate.valueTypingExpressionsName(e)) {
                  onChangeLastName(e.target.value);
                }
              }}
              value={lastName}
            />
            <CInputGroupPrepend style={{ cursor: 'pointer' }}>
              <CInputGroupText
                onClick={async () => {
                  await setShowEditLastName(true);
                  await lastNameInputRef?.current?.focus?.();
                }}
              >
                <CIcon name={'cil-pencil'} />
              </CInputGroupText>
            </CInputGroupPrepend>
          </CInputGroup>
          {errorFormMsg?.errorLastNameMsg && <ErrorMessage>{errorFormMsg?.errorLastNameMsg}</ErrorMessage>}
          {showEditLastName && (
            <RowButtonContainer>
              <CancelButton
                disabled={isFetching}
                onClick={() => {
                  setShowEditLastName(false);
                  setErrorFormMsg({
                    ...errorFormMsg,
                    errorLastNameMsg: '',
                  });
                  setLastName(auth?.last_name);
                }}
              >
                Cancel
              </CancelButton>
              <SaveButton
                disabled={!lastName && !loadingLastName}
                onClick={() => updateAdminProfile('lastName')}
                color="info"
              >
                {loadingLastName ? <CSpinner size="sm" color="light" /> : 'Save'}
              </SaveButton>
            </RowButtonContainer>
          )}
        </CFormGroup>

        <CFormGroup>
          <CLabel>Email</CLabel>
          <CInput value={auth?.email || ''} disabled />
        </CFormGroup>
      </ContentContainer>
    </Container>
  );
};

export default Profile;

const FullName = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: ${spacing[3]}px;
  margin-bottom: 0px;
`;

const RowButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing[4]}px;
`;

const Title = styled.h1`
  margin-top: ${spacing[3]}px;
`;

const CancelButton = styled(CButton)`
  width: 100px;
`;

const SaveButton = styled(CancelButton)`
  margin-left: ${spacing[4]}px;
`;

const ContentContainer = styled.div`
  padding-left: 20%;
  padding-right: 20%;
  margin-top: ${spacing[3]}px;
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 12px;
  margin-top: ${spacing[2]}px;
`;
