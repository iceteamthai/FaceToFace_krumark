import React from 'react'
import { useState, useEffect } from 'react'
import api from '../services/api'

const Members = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const fetchMembers = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/members');
            setMembers(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormData({
            firstName: '',
            lastName: '',
            email: ''
        })

        try {
            await api.post('/members', formData);
        } catch (err) {
            console.error(err);
        }   
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i className="bi bi-people-fill text-blue-600"></i>
                        จัดการข้อมูลสมาชิก
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='FristName' required/>
                        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='LastName' required/>
                        <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' required/>
                        <button type='submit'>เพิ่มสมาชิก</button>
                    </form>

                    {loading && <p>loading ....</p>}

                    {error && (
                        <p className='text-red-600'>{error}</p>
                    )}

                    {!loading && (
                        <table className="min-w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">ชื่อ</th>
                                    <th className="border px-4 py-2">นามสกุล</th>
                                    <th className="border px-4 py-2">อีเมล</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member =>(
                                    <tr key={member.id}>
                                        <td className='border px-4 py-2'>{member.id}</td>
                                        <td className='border px-4 py-2'>{member.firstName}</td>
                                        <td className='border px-4 py-2'>{member.lastName}</td>
                                        <td className='border px-4 py-2'>{member.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-gray-700 flex items-center gap-2">
                            <i className="bi bi-info-circle-fill text-blue-600"></i>
                            หน้านี้จะใช้สำหรับแสดงและจัดการข้อมูลสมาชิกทั้งหมด
                        </p>
                        <p className="text-gray-600 text-sm mt-2 ml-6">
                            (ในส่วนของ Part 2 เราจะเพิ่มการเชื่อมต่อกับ API)
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Members