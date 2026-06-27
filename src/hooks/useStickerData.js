import { useState, useEffect, useRef } from 'react';

const initializeStudents = () => {
  const students = [];
  for (let i = 1; i <= 24; i++) {
    const groupNum = Math.ceil(i / 4);
    const monthlyGroups = {};
    for (let m = 1; m <= 12; m++) {
      monthlyGroups[m] = groupNum;
    }

    students.push({
      id: `student_${i}`,
      number: i,
      name: `학생 ${i}`,
      monthlyGroups: monthlyGroups,
      totalStickers: 0,
      complimentHistory: []
    });
  }
  return students;
};

export const useStickerData = (uid) => {
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const studentsRef = useRef([]); // To keep track of latest state for saving

  useEffect(() => {
    studentsRef.current = students;
  }, [students]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!uid) {
        // UID가 없으면 로컬 스토리지 또는 기본값 (학생 모드 등)
        const saved = localStorage.getItem('compliment_sticker_data');
        if (saved) {
          try {
            setStudents(JSON.parse(saved));
          } catch (e) {
            setStudents(initializeStudents());
          }
        } else {
          setStudents(initializeStudents());
        }
        setIsLoaded(true);
        return;
      }

      // Firestore에서 선생님 데이터 불러오기
      if (window.firebaseDb && window.firebaseGetDoc && window.firebaseDoc) {
        try {
          const docRef = window.firebaseDoc(window.firebaseDb, "teachers", uid);
          const docSnap = await window.firebaseGetDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (isMounted) setStudents(data.students || initializeStudents());
          } else {
            // 문서가 없으면 초기화해서 저장
            const initial = initializeStudents();
            await window.firebaseSetDoc(docRef, { students: initial });
            if (isMounted) setStudents(initial);
          }
        } catch (error) {
          console.error("Firestore 데이터 로드 실패", error);
          alert("데이터베이스에서 반 정보를 불러오는 데 실패했습니다. 보안 규칙을 확인하세요.");
          if (isMounted) setStudents(initializeStudents());
        }
      } else {
        if (isMounted) setStudents(initializeStudents());
      }
      
      if (isMounted) setIsLoaded(true);
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  // Firestore에 데이터를 저장하는 유틸 함수
  const saveToFirestore = async (newStudents) => {
    if (uid && window.firebaseDb && window.firebaseSetDoc && window.firebaseDoc) {
      try {
        const docRef = window.firebaseDoc(window.firebaseDb, "teachers", uid);
        await window.firebaseSetDoc(docRef, { students: newStudents }, { merge: true });
      } catch (error) {
        console.error("Firestore 저장 실패:", error);
      }
    } else if (!uid) {
      localStorage.setItem('compliment_sticker_data', JSON.stringify(newStudents));
    }
  };

  const addCompliment = (studentId, reason) => {
    const newStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          totalStickers: student.totalStickers + 1,
          complimentHistory: [
            ...student.complimentHistory,
            { date: new Date().toISOString().split('T')[0], reason }
          ]
        };
      }
      return student;
    });
    setStudents(newStudents);
    saveToFirestore(newStudents);
  };

  const updateStudentName = (studentId, newName) => {
    const newStudents = students.map(student => 
      student.id === studentId ? { ...student, name: newName } : student
    );
    setStudents(newStudents);
    saveToFirestore(newStudents);
  };

  const updateStudentGroup = (studentId, month, newGroupNum) => {
    const newStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          monthlyGroups: {
            ...student.monthlyGroups,
            [month]: parseInt(newGroupNum, 10)
          }
        };
      }
      return student;
    });
    setStudents(newStudents);
    saveToFirestore(newStudents);
  };

  const bulkUpdateStudents = (dataList) => {
    const newStudents = [...students];
    dataList.forEach(data => {
      const idx = newStudents.findIndex(s => s.number === data.number);
      if (idx !== -1) {
        newStudents[idx] = {
          ...newStudents[idx],
          name: data.name || newStudents[idx].name,
          monthlyGroups: {
            ...newStudents[idx].monthlyGroups,
            ...(data.monthlyGroups || {})
          }
        };
      }
    });
    setStudents(newStudents);
    saveToFirestore(newStudents);
  };

  const clearData = () => {
    const newStudents = initializeStudents();
    setStudents(newStudents);
    saveToFirestore(newStudents);
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `compliment_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return {
    students,
    addCompliment,
    updateStudentName,
    updateStudentGroup,
    bulkUpdateStudents,
    clearData,
    exportData
  };
};
