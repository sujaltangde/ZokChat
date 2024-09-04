import { ElementType } from 'react'
import Header from './Header'
import Title from '../shared/Title'

const AppLayout = () => (WrappedComponent: ElementType) => {
    return (props: any) => {
        return (
            <>
                <Title />  
                <Header/>
                
               

                <div className="w-full grid grid-cols-12 ">

                    <div className="min-h-[88vh] xl:flex md:flex hidden col-span-3 ">First</div>
                    <div className="min-h-[88vh] col-span-6 "> <WrappedComponent {...props} /></div> 
                    <div className="min-h-[88vh] xl:flex hidden col-span-3 bg-gray-600  ">Third</div>

                </div>



                <div>Footer</div>
            </>
        )
    }
}

export default AppLayout