import { createContext, useContext, useState } from 'react';
import { getCallHistory, getDistinctPatientsData, getPatientsCallData, getCallAUDIO } from '../../../utils/CustomerUiAPI';
import { useEffect } from 'react';


export const CallHistoryContext = createContext(null);

const useCalllHistoryService = () => {
    const [callerList, setCallerList] = useState([]);
    const [callList, setCallList] = useState([]);
    const [selectedCall, setSelectedCall] = useState('');
    const [callContent, setCallContent] = useState({});
    const [selectedMember, setSelectedMember] = useState('');
    const [audioUrl, setAudioUrl ] = useState(null);

    useEffect(() => {
        if (callContent?.call_audio_url) {
            getCallAUDIO(callContent?.call_audio_url,  "hunnurji@voicecare.ai", "test-session-id")
            .then(res => {
                console.log({ res });
                //setAudioUrl(res?.data);
            })
            .catch(e => {
                console.log({ e }, 'get call audio');
            })
        }
    }, [callContent?.call_audio_url]);

    const getUniquePatientData = (
        memberId,
        batchRequestDocumentId,
        emailId,
        currentSessionId
      ) => {
        getDistinctPatientsData(
          memberId ? "member_id" : "",
          memberId,
          batchRequestDocumentId,
          emailId,
          currentSessionId
        )
          .then((res) => {
            const data = res.response;
            setCallerList(data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      };

      const fetchPatientCallData = (memberId, batchId="") => {    
        getPatientsCallData(
          memberId,
          "hunnurji@voicecare.ai",
          "test-session-id",
          batchId
        )
          .then((res) => {
            setCallList(res.response);
          })
          .catch((e) => console.log("Error fetching calls", e));
      };

      const fetchCallDetails = (id) => {
        getCallHistory(id, "hunnurji@voicecare.ai", "test-session-id")
        .then((res) =>
          setCallContent(res.response)
        ).catch((e) => console.log("Error fetching calls", e));
      };

      const handleCallSelect = (id) => {
        setSelectedCall(id);
        fetchCallDetails(id);
      }

      const getActiveCallInfo = () => {
        return callList?.find(item => item.id === selectedCall);
      }
      
      const getSelectedMemberInfo = () => {
        return callerList?.find(item => item.member_id === selectedMember);
      }

    return {
        getUniquePatientData,
        callerList, 
        fetchPatientCallData, 
        callList,
        selectedCall,
        setSelectedCall,
        fetchCallDetails, 
        handleCallSelect, 
        callContent,
        getActiveCallInfo,
        selectedMember,
        getSelectedMemberInfo,
        setSelectedMember,
        audioUrl,
    }
}

export const CallHistoryProvider = ({ children }) => {
    const value = useCalllHistoryService()  

    return <CallHistoryContext.Provider value={value}>{children}</CallHistoryContext.Provider>
}

export const useCallHistoryProvider = () => useContext(CallHistoryContext);