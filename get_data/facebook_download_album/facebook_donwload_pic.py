from numpy import require
from links_fotos.link import *
import argparse

def get_idade(link:string, driver:string) -> None:
    save_page(
        link=link,
        driver_firefox_path=driver)

    get_links()
    download_pictures()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(add_help='')

    parser.add_argument('-l',
                        '--link',
                        type=str,
                        help='link to album facebook',
                        required=True
                    )

    parser.add_argument(
                        '-d',
                        '--driver',
                        type=str,
                        help='path to firefox driver',
                        required=True
                        )

    opt = parser.parse_args()

    get_idade(link=opt.link, driver=opt.driver)

# save_page(
#     link='https://www.facebook.com/IFMT.Oficial/photos/?mt_nav=1&tab=album&album_id=290430931000276&ref=page_internal',
#     driver_firefox_path='driver/geckodriver'
#     )

# get_links()

# download_pictures()