import { useState, useEffect } from 'react';

const STORAGE_KEY = 'compliment_sticker_data';

// 6 groups, 4 students each = 24 students
const initializeStudents = () => {
  const students = [];
  for (let i = 1; i <= 24; i++) {
    const groupNum = Math.ceil(i / 4);
    
    // 1월부터 12월까지 기본 모둠 배정
    const monthlyGroups = {};
    for (let m = 1; m <= 12; m++) {
      monthlyGroups[m] = groupNum;
    }

    students.push({
      id: `student_${i}`,
      number: i,
      name: `학생 ${i}`, // Default name, can be masked or changed
      monthlyGroups: monthlyGroups,
      totalStickers: 0,
      complimentHistory: []
    });
  }
  return students;
};

export const useStickerData = () => {
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        let parsed = JSON.parse(saved);
        // 마이그레이션: 기존 groupNumber가 있고 monthlyGroups가 없는 경우
        parsed = parsed.map(s => {
          if (s.groupNumber !== undefined && !s.monthlyGroups) {
            const mGroups = {};
            for (let m = 1; m <= 12; m++) mGroups[m] = s.groupNumber;
            const { groupNumber, ...rest } = s;
            return { ...rest, monthlyGroups: mGroups };
          }
          return s;
        });
        setStudents(parsed);
      } catch (e) {
        console.error("Failed to parse local data", e);
        setStudents(initializeStudents());
      }
    } else {
      setStudents(initializeStudents());
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    }
  }, [students, isLoaded]);

  const addCompliment = (studentId, reason) => {
    setStudents(prev => prev.map(student => {
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
    }));
  };

  const updateStudentName = (studentId, newName) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, name: newName } : student
    ));
  };

  const updateStudentGroup = (studentId, month, newGroupNum) => {
    setStudents(prev => prev.map(student => {
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
    }));
  };

  const clearData = () => {
    setStudents(initializeStudents());
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `compliment_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return {
    students,
    addCompliment,
    updateStudentName,
    updateStudentGroup,
    clearData,
    exportData
  };
};
