import React from 'react';
import Chart from 'react-apexcharts'
import { useState, useEffect } from 'react';
import { routes, callApi } from '../../routes';

const Dashboard = ({ setPageName }) => {
    setPageName("Dashboard")

    const [profileVisit, setProfileVisit] = useState({
        annotations: {
            position: 'back'
        },
        dataLabels: {
            enabled:false
        },
        chart: {
            type: 'bar',
            height: 300
        },
        fill: {
            opacity:1
        },
        plotOptions: {
        },
        series: [{
            name: '',
            data: []
        }],
        colors: '#435ebe',
        xaxis: {
            categories: [],
        },
    })
    const [visitorsProfile, setVisitorsProfile] = useState({
        series: [],
        labels: [],
        colors: ['#435ebe','#55c6e8'],
        chart: {
            type: 'donut',
            width: '100%',
            height:'350px'
        },
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '30%'
                }
            }
        }
    });

    const [topPosts, setTopPosts] = useState([])
    const [userCounts, setUserCounts] = useState({
        student_count : 0,
        instructor_count : 0,
        admin_count : 0,
        moderator_count : 0
    })

    useEffect(() => {
        callApi(routes.getDashboardData).then(data => {
            const category_names = data.category_data.map(item => item.name)
            const category_post_counts = data.category_data.map(item => item.post_count)

            setProfileVisit({
                ...profileVisit, 
                series: [{
                    name: 'Category Post Count',
                    data: category_post_counts
                }],
                xaxis: {
                    categories: category_names,
                }
            })
            const totatStudentAndInstructorCont = data.student_count + data.instructor_count
            const studentPercentage = parseFloat(((data.student_count / totatStudentAndInstructorCont) * 100).toFixed(2))
            const instructorPercentage = parseFloat(((data.instructor_count / totatStudentAndInstructorCont) * 100).toFixed(2))
            
            setVisitorsProfile({
                ...visitorsProfile,
                series: [studentPercentage, instructorPercentage],
                labels: ['student', 'instructors']
            })
            
            const topPosts = data.top_posts.map(post => {
                return {
                    id: post.id,
                    title: post.title,
                    uname: post.uname,
                    user_avatar: post.user_avatar            
                }
            })
            setTopPosts(topPosts)
            setUserCounts({
                student_count: data.student_count,
                instructor_count: data.instructor_count,
                admin_count: data.admin_count,
                moderator_count: data.moderator_count
            })
        })
    },[])


    // var chartVisitorsProfile = new ApexCharts(document.getElementById('chart-visitors-profile'), optionsVisitorsProfile)
    // var chartEurope = new ApexCharts(document.querySelector("#chart-europe"), optionsEurope);
    // var chartAmerica = new ApexCharts(document.querySelector("#chart-america"), optionsAmerica);
    // var chartIndonesia = new ApexCharts(document.querySelector("#chart-indonesia"), optionsIndonesia);

    // chartIndonesia.render();
    // chartAmerica.render();
    // chartEurope.render();
    // chartVisitorsProfile.render();

    return (
        <section className="row">
            <div className="col-12 col-lg-9">
                <div className="row">
                    <div className="col-6 col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body px-3 py-4-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="stats-icon purple">
                                            <i className="iconly-boldShow"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <h6 className="text-muted font-semibold">Students</h6>
                                        <h6 className="font-extrabold mb-0">{userCounts.student_count}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body px-3 py-4-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="stats-icon blue">
                                            <i className="iconly-boldProfile"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <h6 className="text-muted font-semibold">Instructors</h6>
                                        <h6 className="font-extrabold mb-0">{userCounts.instructor_count}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body px-3 py-4-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="stats-icon green">
                                            <i className="iconly-boldAdd-User"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <h6 className="text-muted font-semibold">Admins</h6>
                                        <h6 className="font-extrabold mb-0">{userCounts.admin_count}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body px-3 py-4-5">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="stats-icon red">
                                            <i className="iconly-boldBookmark"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <h6 className="text-muted font-semibold">Moderators</h6>
                                        <h6 className="font-extrabold mb-0">{userCounts.moderator_count}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Category vs Post</h4>
                            </div>
                            <div className="card-body">
                                {/* <div id="chart-profile-visit"></div> */}
                                <Chart 
                                    options={profileVisit}
                                    series={profileVisit.series}
                                    type={profileVisit.chart.type}
                                    height={profileVisit.chart.height}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Latest Comments</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-lg">
                                        <thead>
                                            <tr>
                                                <th>Author</th>
                                                <th>Post</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topPosts.map(post => <tr>
                                                <td className="col-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar avatar-md">
                                                            <img src={post.user_avatar} />
                                                        </div>
                                                        <p className="font-bold ms-3 mb-0">{post.uname}</p>
                                                    </div>
                                                </td>
                                                <td className="col-auto">
                                                    <p className=" mb-0">{post.title}</p>
                                                </td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-3">
                <div className="card">
                    <div className="card-body py-4 px-5">
                        <div className="d-flex align-items-center">
                            <div className="avatar avatar-xl">
                                <img src="assets/images/faces/1.jpg" alt="Face 1" />
                            </div>
                            <div className="ms-3 name">
                                <h5 className="font-bold">John Duck</h5>
                                <h6 className="text-muted mb-0">@johnducky</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h4>Recent Messages</h4>
                    </div>
                    <div className="card-content pb-4">
                        <div className="recent-message d-flex px-4 py-3">
                            <div className="avatar avatar-lg">
                                <img src="assets/images/faces/4.jpg" />
                            </div>
                            <div className="name ms-4">
                                <h5 className="mb-1">Hank Schrader</h5>
                                <h6 className="text-muted mb-0">@johnducky</h6>
                            </div>
                        </div>
                        <div className="recent-message d-flex px-4 py-3">
                            <div className="avatar avatar-lg">
                                <img src="assets/images/faces/5.jpg" />
                            </div>
                            <div className="name ms-4">
                                <h5 className="mb-1">Dean Winchester</h5>
                                <h6 className="text-muted mb-0">@imdean</h6>
                            </div>
                        </div>
                        <div className="recent-message d-flex px-4 py-3">
                            <div className="avatar avatar-lg">
                                <img src="assets/images/faces/1.jpg" />
                            </div>
                            <div className="name ms-4">
                                <h5 className="mb-1">John Dodol</h5>
                                <h6 className="text-muted mb-0">@dodoljohn</h6>
                            </div>
                        </div>
                        <div className="px-4">
                            <button className='btn btn-block btn-xl btn-light-primary font-bold mt-3'>Start
                                Conversation</button>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h4>Visitors Profile</h4>
                    </div>
                    <div className="card-body">
                        <Chart 
                            options={visitorsProfile}
                            series={visitorsProfile.series}
                            type={visitorsProfile.chart.type}
                            height={visitorsProfile.chart.height}
                            width={visitorsProfile.chart.width}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}


export default Dashboard;
