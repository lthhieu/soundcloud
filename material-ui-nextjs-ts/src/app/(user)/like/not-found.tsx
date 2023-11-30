'use client'
import Container from '@mui/material/Container/Container'
import './style.css'
import Link from 'next/link'
import Button from '@mui/material/Button/Button'
import { useToast } from '@/utils/use-toast-mui';
import { useEffect } from 'react'
export default function NotFound() {
    const toast = useToast()
    useEffect(() => {
        toast.error('Please Sign In Again')
    }, [])
    return (
        <Container>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1>404</h1>


                                </div>

                                <div className="contant_box_404">
                                    <h3 style={{ margin: '0' }}>
                                        Look like you're lost
                                    </h3>

                                    <p>the page you are looking for not avaible!</p>

                                    <Link href="/"><Button variant='contained' color='warning'>Go to home</Button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}