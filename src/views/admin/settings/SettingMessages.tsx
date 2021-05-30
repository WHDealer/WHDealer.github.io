import React, { useState, useEffect } from 'react';
import { CDataTable, CButton, CInput, CSelect } from '@coreui/react';
import config from '../../../config';
import { callApiAction, SUCCESS } from '../../../store/callApi/actions';
import { statuses, colors } from './constants';
import ModalCreateMessage from './ModalCreateMessage';
import ModalUpdateMessage from './ModalUpdateMessage';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

const fields = [
  { key: 'message_id', label: 'Id', _style: { width: '1%' } },
  { key: 'popup', label: 'Popup', _style: { width: '1%' } },
  { key: 'status', label: 'Status', _style: { width: '1%' } },
  { key: 'text', label: 'English Message', _style: { width: '20%' } },
  { key: 'text_de', label: 'German Message', _style: { width: '20%' } },
  { key: 'duration', label: 'Duration', _style: { width: '1%' } },
  { key: 'descriptions', label: 'Description', _style: { width: '20%' } },
  { key: 'action', label: 'Action', _style: { width: '1%' } },
];

const SettingMessages: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const callApi = (payload: any, callback?: (result: any) => void) => dispatch(callApiAction(payload, callback));

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [popup, setPopup] = useState('');
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);
  const [createModalData, setCreateModalData] = useState({ show: false, initialValues: {} });
  const [updateModalData, setUpdateModalData] = useState({ show: false, initialValues: {} });

  const reload = () => {
    setIsLoading(true);
    callApi(
      {
        method: 'get',
        api: config.rest.getAllMessages(),
      },
      (response) => {
        const { status } = response;
        const data1 = response.data;
        if (status === SUCCESS)
          setData(
            data1
              .map((value: any) => {
                return { ...value, message_id: parseInt(value.message_id) };
              })
              .sort((x: any, y: any) => y.message_id - x.message_id),
          );
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    reload();
  }, []);

  let noItems = <div />;

  const popupBool = popup === 'true' ? true : false;

  let filteredData = data;
  if (search !== '') {
    const searchLowerCase = search.toLowerCase();
    filteredData = filteredData.filter(
      (value: any) =>
        value.text.toLowerCase().includes(searchLowerCase) || value.message_id.toString().includes(searchLowerCase),
    );
  }
  if (popup !== '') filteredData = filteredData.filter((value: any) => value.popup === popupBool);
  if (status !== '') filteredData = filteredData.filter((value: any) => value.status === status);

  if (!isLoading) {
    if (filteredData.length === 0) noItems = <div>No items found!</div>;
  }

  return (
    <div style={{ width: '90%', margin: '10px auto' }}>
      <ModalCreateMessage
        data={data}
        show={createModalData.show}
        initialValues={createModalData.initialValues}
        handleClose={() => setCreateModalData({ show: false, initialValues: {} })}
        reload={reload}
      />
      <ModalUpdateMessage
        show={updateModalData.show}
        initialValues={updateModalData.initialValues}
        handleClose={() => setUpdateModalData({ show: false, initialValues: {} })}
        reload={reload}
      />

      <div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, marginBottom: 30 }}>
          <div className="mr-3" style={{ position: 'relative', width: 220 }}>
            <CInput
              style={{ width: 220, position: 'absolute', paddingLeft: 32 }}
              type="text"
              placeholder="search"
              value={search}
              maxLength={50}
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <i style={{ position: 'absolute', left: 10, top: 11, color: '#777' }} className="fa fa-search icon"></i>
          </div>
          <CSelect
            className="mr-3"
            style={{ width: 160 }}
            value={popup}
            onChange={(e: any) => setPopup(e.target.value)}
          >
            <option value="">Show popup?</option>
            <option>true</option>
            <option>false</option>
          </CSelect>
          <CSelect style={{ width: 160 }} value={status} onChange={(e: any) => setStatus(e.target.value)}>
            <option value="">Status?</option>
            {statuses.map((value: string) => (
              <option key={value}>{value}</option>
            ))}
          </CSelect>
          <div style={{ textAlign: 'right', flex: 1 }}>
            <CButton
              color="primary"
              onClick={() => {
                setCreateModalData({
                  show: true,
                  initialValues: {
                    message_id: '',
                    popup: 'true',
                    status: 'success',
                    text: '',
                    text_de: '',
                    duration: 5,
                    descriptions: '',
                  },
                });
              }}
            >
              Create message
            </CButton>
          </div>
        </div>
      </div>
      <CDataTable
        items={filteredData}
        fields={fields}
        loading={isLoading}
        noItemsViewSlot={noItems}
        hover
        striped
        sorter
        sorterValue={{ column: 'message_id', desc: 'true' }}
        scopedSlots={{
          popup: (item: any) => <td>{item.popup ? 'true' : 'false'}</td>,
          status: (item: any) => <td style={{ fontWeight: 'bold', color: colors[item.status] }}>{item.status}</td>,
          duration: (item: any) => <td>{item.popup === false ? 0 : item.duration}</td>,
          action: (item: any) => (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  setUpdateModalData({ show: true, initialValues: item });
                }}
              >
                <i className="fas fa-pencil-alt"> </i>
              </CButton>
            </td>
          ),
        }}
      />
      {filteredData.length !== 0 && (
        <div style={{ textAlign: 'right', marginRight: 100 }}>Total: {filteredData.length}</div>
      )}
    </div>
  );
};

export default SettingMessages;
