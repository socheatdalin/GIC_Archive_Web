import React from 'react'
import Web from "../assets/ux.png";
import Comment from "../components/comment";
import Navbar from '../components/Navbar';

function ThesisDetail() {
  return (
    <>
    <Navbar />
      <div className='p-5 container'>
      <nav>
          <ol class="breadcrumb fw-bold fs-4">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active" aria-current="page"><a href="/thesis/detail">Detail</a></li>
          </ol>
      </nav>
        <div className='p-5 border border-1 rounded-2 shadow p-3 mb-5 my-5 bg-body-tertiary rounded  '>
              <div className ="card-body d-flex flex-row mb-3 justify-content-start grid gap-0 column-gap-5  ">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGRgYHBgYGRkaGBkYGBkcGBoZGhgYGBgcIS4lHB4rIRgaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQsJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NjQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAJ8BPgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgADBAUGB//EADcQAAEDAwIEBAUEAQQCAwAAAAEAAhEDITESQQQiUWEFcYGREzKhsfBCwdHhBhRSYvGC0iNykv/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACYRAAICAQQCAgEFAAAAAAAAAAABAhEhAxIxQVFhEyKRBDJSgaH/2gAMAwEAAhEDEQA/APkkqSgousxGDkdSREJiGlGUqkpgHUhKhQSAbUpKVEIAMqSooQgASjKEIwgAypKhKiKAkqSogigIgSilQBNXdSUFEhhlSUEQgQJUlRBIYZUlCFEAGVJSooABcpKiiTGCVJKkKBAySpKKiVACUb/hUURQWSUzSlRanQBURhSFZAFFEQEAQIqBEFFAKoiomAqITQoAlQARTKJ0KwKFGFAigFUTaentv/aCAApKiiKGCUCmhQBKgA1DSrA1O2mfwp0LcU6VAFoNIixEYPuJB9iCgaaKFuKHNuhC0FmPzH4EHU4S2j3GeFIV2hKWooe4rUTuCUhFDsQhRMoTaPM+8fwpoYqiiiBhHdAKKIEFRQIoEBEKItQAVEVFYgKIwjCBWM+o5waCSdI0t7CSYHqT7pIRRCBiwjCKMIoViqyppJ5QQLWJk4E3gbylhRUIgUUUTESFIRQToCQmmc++/wDaVSEqAYs3yOv89EsJ22uFYNJzY9Yt6gY9PZFBZQGpmsVxpERIzg5BjMHBTtZ7+do8o/dG0lyKmsVop2HmfsFdTYtPwhHr6QR0jt91SiZPUoxNp/nRT4V4XTo8C51mtJ8hPqtjvBzbU5rTe5MyPTp+YVqDfCMXrxTyzhClaOtx9vuFWWfnuu+3w1gcAawOLBpvO0g91U/wqRAqB0EiLiMWg43R8TGv1EfP+HCLEpaurX4BzbxawmREnqbbz+BYjRJMdTGQPr+6hxa5No6ifDMTmJCFrfTj8/dVvp2B6z9P+1DiaxkZSEHK4tVZChmiZWQomhRSVYAEYRAQKYiKKIgSmIkIgKAIlFBZFFFJRYBRSopiCCooiAmhEhREBWvgxDYsAbzJAufU3hVQrKYRhNCaE6FYgam0pwFY8AmQNPaSR7m6aRLkZ9KfVy6YGZmObBET07Jy1FzZvHt2tKdBuM8IhqshOGSLC/1Pp6fVKh2VBqYNTafzKdrE9pLkXcNWcwEC7XfM0iWu8wd+4uNiFppcO13y2P8AtJt/4uP2PuVXSpTfYfyBj1XQ4Om2f7/pVGJz6upSDS8PdiDPSDPkvU+E/wCKaWipxHKCJaz9RGZM/KPNer/xHwyk2i2tUAJnkDsCOk9/RY/HOJDnOIa55zBB3FjIIMDMtHbqmmnLauuWcc5y2Jt88L0cDxTi2MaWUwGW5WgfN5nONyvOHiNTdTqjW6ctaAXQAb2MkT1PqtPHNqfEe5xcJc5pcJgkzpubkWNyMZysI4MiqAwtJ1Q1zms0EGea5hpxykDORvpJvhFaWnFK3+Sk8WTWs+oBPK5w1OEX5gJBI9rdFaeJcA5xaS1xMOktaDYgjqRzCIFu4tRXpu1nUAZdBLWi14c7lvG/vfCUNk6Q5xbIFhaDcx0IjIG52zCtHQ4xefR1mPn5gSXDU3TpEncECBscY3CTiPDNZIaCHXtmSBLgRaIjfaDYXStoimNLdL9QbBDm6muJMxpJMyBm/kLm7hOKbMvcS7VpIJJJaRZ2s7gnf7LRZwzldx+0TgVqEOgyIzue523myzjcRmDbNp/n8vPq+I4PWCHN5xIE8skbGDA9bXHZcGvAtpEiZuYmTgTAWU4Uzq0tbcq7ObxfD6SBIuGmxnIvPQzNtllc1dSoGyQW9p1EYEfe/osr6YItPTr5bDosXHJ1wnjJjDZsFAxahSF5cbCwj6TNtyqX+w2Ax/alxrk0TvgrcEsJoUhIaFhOR0UAR2g7ppA2Ii0KJmhKgsSFITwjpRQWVlEJoUDUUFkCdoQaAmarSIbGDVZ8OMkff7INdH59ky0SRDbE0qEJwVCOiVCsQJkQwnb+E7afmfIFNIG0K2dlp4VrdQ1TG8CfKR02zuqiYtYT1I/PdXNoncgev2A/ZWkRJ4KnUwMn87QpoA/CP+lqr0wCdJ1CxxEEi9j3nt+1Gm/Xf+U9pO7AK5LjJjYWgCwjA8kGMPRWBm5nt38z5dP7TNdFhvY7A73G+N0qC8Ui+jSIEuBAOJsDBvnK6nhXDa3ta12SNjbMn6D8C5bXkiCZAwDgTmOi7Xgrw3U686cdyTgKorJya7ai32e2b4qGuDRpLGaWhvzO025mtFzufRcjiuINYMeyS6CTpJFmkiGzAmCXSNUFk4XmOO8Vc1ziwkm0iJbBnIOY8oj1XS/x6o55A1WaABIlzgPm0uJIAIaDBtzASdIgTW6kZLScdPczqcRwR0RVDnCWzUYZI1kw3S4jUOW8mTMyFwOO4ZzXlodqBd8zbaTqdyuJEszN4xg2K9Px/DtdyOvJDQQQANcESY8id7wvJ1/D6rKukTIIADRLokjURPyjTBdABgSCc21XAaE96dsRtBpdBnVqLZJ5SZAgute9zexCv+C5pfRbDtQiRzRpu2INiTGZzur+A8IJqFskPDnNdp5mOk6XEug6QDciYdLYiAVup0H0qrKTuUhxEAtLoDjLxkGAw7QNIxJST8lTdcOzzfCcE8VIBLSwuAdGloLQSYcbWNozzBBlfUXgtc57iCHBwzJGANy7pkDotFUvdVfRJ1Auc4O5bwCQTFthYdVk4H4mpz6Z+SXkECA0HTgbcxsDgHcJX4Nsu264R2OAcXl1XVOktDg50l2qQIIvHKBf3NlR4twJ1NeBLXjF7HLoAxmfUpeCoOJY/SHB7xcQPlgkAixBkXj9O2/Z41rvgOglrmkOEG9zpifJytq4s5Zy2aiafODxrqI3dHXf8/ZZ3icWaM9b9epMY7La8EzO2Sbx6H7LJXf2EbWj1tC5pI9GDZicfpgJHCMK50dPY/zKWGkbyO4iPOOv3WZ0JlB9lA1F3kpdTgsWUTdMMXOEhQwCHdlAUEwCLYYHA7hGPJAAIkBaIkmlEMQRATVCyHR2KhCsaIRJHRVSJsqAVtzc+5ICAPRNPf6YRQmwaB+EJ2sHb1P8FQvJMmDPlPvlNY5EbDYD6X+ieBOxnvLrlwmwzsLNGLAC3sq9HVw9/wByp8PfI7KBu3/XmgWDO5sExGc6hj3la6dTJkW31N+l1kIGqMSYna/2CcUyNQsQLSCCD3B3Siy5JNZNdKm5x5SyAN6lMfQuutFKRNmGQRDnsMdwdS5FNpkWWwCFcXZE4o1mkXX5TYfrZaBG5xZBtE/7m/8A7Z/7LP5Z/MLQyk53M4gA31Pm/cRzO88JmdGmjwx/3M9Xsv2yu74b4NWLC7kDTh5qsDbSTEOM+QvdcOnVY0ON3OMCXCQRvymQP051TGyf/UOcDqc5ztNjq1dIg7G5ttCE3ZhqRtUDiOH0vIs9xMudrZmARpbqkgEZMWkELp/47w5c8tc6ajS6GtezS1rTENbhkgmMHURa4LfPVNIcNLZIa4kOPKZBgtPkZ9O0IUK7m1C9ogkgODjLTq/S4G8HSSenayzWJWbuLlBx9Hf8X8TLiNJaXAgktqCXEapAINmxexmO/wAurwzTXcKbSDIg8wMyGtBa3VLTYk5G0wWgedZWLy+YmSYiSAA4iI/+pEgAAGd10vBuF1VtB0kbEwD8zXS1paC5wguIkYGBY6qVuzGWmox2rFHUdRcHaXOZczd4cWaHAAFsnIIEEGzWid1hqccAWtJY1mkAtJLiYN9TtW5AFjIBvcGOlx4eXlhB5SWDzaT8oLjqbqY0gEzOlpBXmn8QxrnNjU6eUtbT0uk6gYHykzgkxMW3UmrJhFtFlLhPiuBDiPntYyW82pp6EENiARAhVcPRgva9zWaG6my8CXS0w25m2RPor/CODcdbS7QXBr2kcshriHQbW0F7sidBGyobp01GEFxBAa5oBAAPNiZETAvF/NSn0atu34wbPCaLnuY5ztLHPMukQHDSXER+oyMDcdDHpGUXOoVJP6C7NxYHzzC5fhnAuHwC2XsMva0ggHSeZzmkyPl9iMXXuK3hWuiWamsdWLW6jMBxLXxGbgOt3C0c1GOTj1YvUmq6Z8t4lloggDc7m9z2i0Xj786tTdFxbYza3Q4XsvEPAeGp6tfFFzh+ltPR7lzr+iqq+DcJoGviKxgcrTomTcwCLf0uWWpE9GGlNUeKAaCC64nAMTG05+ipe8ajpAAk2N7dJP8AS6vG+GMLj8OrLdtbY8hy49lza/h9QGzC62WAuFrbX2Ubk+DpUGuTO5xFj/HqEsboupuAuCIzqEZxYpQJOYTKAQcIKFxCWQpdDRY2pCirKLXIvyFeDSFIQZiUxI6rQyYEzW91AjCaE2MfogAoHEKSrEFoTh1sbQkCITQmGE0QgpKYgh5G6eo+YxYXgATnMeaQEZI/ZB+fokLFmWoblWUXEA+SqcLq6kyAZt2yfbb1Wa5NnVEYbiQuqeFc0c0s3g/MR105HmQB3XNpVII08vfLvfb0haQ05O97/dawMplzakHlH/keY+YGG9cSOqatVL3FzjLj7Hz6fkpKbwA7lBOATkSci87Eb5QBPb2n6m6ujJgnqreGrkOHQbAZEmR3yfZFjSdo77D86INaQYEE9SY+pIuQIv164GibTTQOKBbBBaHcwn5RAEAti2o3yIv1Kyva0AsLHB8iLiCMy4EA4IO+DtjosGoCRJbsckHv1B9x5KgUywhwgGSCDcGALDe+THlZRKHZcJ0qfJVTlxcATYySRLgQbxzZMXt0wVu8O4/VVJc4S6QSYBJJAFhEmYPLBtbKx/6O5aZY4E3klp6i0kntuI6yqX8K0aQXwCGkxDrEgGSCY9JyPSLkuimoyPQ+JMcCXUaoAu3ldDTOqCHAiQWhsiMm41Lk8TwrmtY8nVrkgDHLGSMzMwtlDxQtdBqBzGtLMOcS0GQ4BwmbNBMde0ZOEo0iXl0gnSGEAxNgS68iwNrxJyQFa+xkrjz16NPBVzVewP5WMaWCWxLQCHM8zOO5jKnhvBvZUj4TnuIcxsSDI1NDpvIFzNoLZ2tY6g1jXNLCXuLSNI0gEzYCSZkxfoIhdyk6QaZ5XlgYXNAjldDmaunK4u3cSIkfNagzKeqknXB6L/EPCXMc12mHOBLnBsNImDn5RYx1XW/zskU2taDI5iQCb7TGPPuuX/j/ABLeHbrccWbOXGMeg9vVed/yfxn47jqIi8HceXXyPuFnOD+S+kZ6OrGWm122curxFYuBOp98OaNJAzLiJxnBP32eC8BX4rXVqubRoMu6o6nOpxNmMBNzmTgW6rh8HwL6tVlNgaXPcGtghzbmNTv+ImTNwAu9/m/iVJrGcHw7v/jotLemp/63O/5EyZPUrn1pJYSyej+njJ8u0VeMcJSBAoPNhE6dGo72FjJ7LmspuYGvM5dH6sAX1T9O64/EudShlR5LwGkMAnTIBAe6RBAO03t1iUPEyGaZJhzjBjDowR3DlipLs6nF4o1eJcc6o3mggk2zEWAjrv6rj1OFtLfY/sV26FEVTTDWmHsc8DJLmue0z6tWDjmOYTynp/KbvkFV0cl1szO4QhbC2c3/AGWapT6X+/8Aaan5Ht8FZEKApVAUNio10/lCCan8oSlbdIy7Y7U0JQU0hUiWSFCTuoXIzvKYiSmaUoKJhNMTGVsN6x6i6pYLqutYp7qViq3RtpOZqbMwTff1gZULmDcehXPJUBS+Qfx+y2o65i3ln3Rols3mN4iY7TuqwZUISvsfVFlN1xH9rU10lY25WtrgbhaQZE0WwnZlVNf+FEPMrZNGLTNzdIxqgaZmPmtPpY/RUAZtPe9r5/b1S06kNcCOkef72ULhIzjrb2CbaJpqy2iTNp9Nri56CY+i2N0uyZzFzpvYnr0tbt0XNc+4H2/YKwVALX989NvzspslxbyPxdIl+p2otsYGdwROAfIGJCrqUIqmGnTqPLqmRflkewjPdWtr7G6elWaJuWiIi5mYzFyN4J29EmkNSklXoPwtNYks0w4HRI3y0mLg29BbJXRq8GGnWGhpdzBrSZbcxANiLY6LHR4mnJF4IAMCAY3AnPt+y6A4qm0A6XOiSMNgnM3PN+ZxcNqRz6sp2sejR/p3F2svLqj/AJnC2m8QBa8AScZAwZ1vqsY0l93C8TzGbFzicfpXKreMmIZDB2mfV23pCxcOS52mQdfLmRLvlk9naT6JuSXBi9Kc/wB+F4NfF+JueZccYGwGYH5dcnjfmI6E7g79RlIXSb2G/wCdVlq1vqsJSs7NLSUeD0H+By3jBUPy0qdeo7yFNzBHeXj3K5/C+Fv46s8B7WNAc+o9xsxkwB/yJJgDttC5TeMewkscWlwLTG7TBLT1Fh7KvhvEX0y/SZD26Xg7gEOHkQRnz6rknFuVnpaTpUe48T8E4Jza3EuqPqOLiQwOY1jS4mGgi/rOy81xFDgQeUP9HyM7SDtH1S+N8KaDaR1l1OuxtUcul2kkm4mCQD9Vw60NtnG+Qbg+yywujRJvs9RU8cZQpNbw7bwRrfDnBrnF5aCe5nzHkuBxHib3/MZ7kyfdZXVGusZHnce4/hB9AjBDh1BlTJstJILqxKq1IfDd0Kb4ZUFBDQ7PvuqywhQyE7XpqTQNGil8qUlXMpcmqW5Np5vZUfDPT6rrd0jlVWwlyre/utfDUQJLjjAzKy8S0BxgyO4hJ2lY403RopO6iQlcOirpPtC38PTaTzGB1mPRXH7IiX1MrT3Csc4nr+y6TvDaY5iSGgdv4St4SjAOq3dwCtRaMvli8q/wczUZSwT3XWdVpA6Q4CNxjylVGpTixbnBsftJRtXka1H/ABZzPRBdJ5YN2+yzOezv7JONdminfRSEZPdKXCbIg3wpsdEJKsbTdmCq3m0jZWt4glpBAP0KaavIndBDyr2UzkkDzK5pkH+0wJ62801qegcPDOiIODKjqkGO38rOAQP7Smpa4k9ZutN5nsL3ViDb3VtGqP1LAXqxj+6Snkbhg6Tazen0Qkbg94WDWQrRWIuYV7r5Mnp1wbqNUNvAJ2n9PfzvbylIKh/PqFifVJSCp3UOQfHZ0HvHWLW3Gfcb9cKr4kb38oA8jv8ARZHVkhfKTkUtM18VWlxJ3v75+srLUqylqPkeVve4/dVT1UORrGFIjnKtx6ovVZbO6hmsUX8Zx76jKbHukUmFjM2bqc+PdxHkB0WNzick9BPQbIFCCsGbIikoEIQlbGWtfFxI8rJ2cQQZz1nCohQBFio3aWvEj17Kg0iElCrpdPuOo6LoOaMi4Nwc/wDRUtWh3Topa6yBKUFSV0WYUOHdFVUN05KqebpSeBxWQsNwtRcsaspORCVYCcbya2cQQbkkRABwAeyoc0l1hPQBM+2whRjgMt+v5C0bvDISrKI9hAkiPzolNQH9I9FDUJ+3kEpqRbp2UtopJjkTYiDHRVOb0VxqCO+9rfdVfE9/JDoFZY1hIFii9pbn+0oqEBM122VSoTsocnpsBBKuDATckeSj2wLdQhR7Dd0LpCRwATykeh0JEg5mfJQgxn0SN7qFxjyU2XQ4iYym1Dp9VQSrGMJBKE74E15LtXT2MBD4kdlQfNFtlW5i2o0F4WdxhF9UnJJSFw6JOVhGNDl9spNZ6pg+EwcMQEv7Hx0BrrGDt9r/ALR6qoOU1dNroPaetvyFLZaQQe6hcFUZRiVO5joDigUCUAVDkXQSoEEfJICalC6UCoAi2FBWihxBZ3B2nfqsyYBAH//Z" class="img-thumbnail" 
                alt="network" style={{ width: "350px" }}></img>
                <div className='information'>
                    <h4>GIC Archive Management System</h4>
                    <p>Git hub Link: </p>
                    <p>Posted By: </p>
                    <p>Upload at: </p>

                    <p className=''> It is a website use to build for store the source code and document before the theis defense </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-start">
                        <button className="btn btn-primary me-md-2" type="button">Code</button>
                        <button className="btn btn-primary" type="button"> Pdf </button>
                    </div>
                </div>
                
          </div>
          {/* <div className='row'>
            <div className='col'>
              <h4>Code</h4>
              <div className="text-success">
                <hr></hr>
              </div>
              <p>https://github.com/SAM-Khema/e-commerce</p>
            </div>
            <div className='col'>
              <h4>Tags</h4>
              <div className="text-success">
                <hr></hr>
              </div>
              <div className='Tags border border-success border-1 rounded-2 d-flex align-items-center p-2' style={{ width: '100px' }}>
                <img src={Web} alt="webpage" className="img-fluid img-smaller"  />
                <span className="ms-2">Web</span>
              </div>
            </div>
            
          </div> */}
          <div className="container">
            <div class="row">
              <div class="col-sm-6">
                <Comment />
              </div>
              <div class="col-sm-6">
                <h4>Tags</h4>
                <div className="text-success">
                  <hr></hr>
                </div>
                <div
                  className="Tags border border-secondary border-1 rounded-2 d-flex align-items-center p-2"
                  style={{ width: "100px" }}
                >
                  <img
                    src={Web}
                    alt="webpage"
                    className="img-fluid img-smaller"
                  />
                  <span className="ms-2">Web</span>
                </div>
                

              <div className='pt-5'>
              <h4>Code</h4>
              <div className="text-success">
                <hr></hr>
              </div>
              <p>https://github.com/SAM-Khema/e-commerce</p>
            </div>
           
                
              </div>
            </div>
          </div>
         
        </div>
        
    </div></>
  )
}

export default ThesisDetail