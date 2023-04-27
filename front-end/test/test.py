import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_page_load(self):
        driver = self.driver

        #driver = webdriver.Chrome()
        time.sleep(3)
        driver.get("https://online-dictionary-frontend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/")
        # self.assertIn("Python", driver.title)
        elem = driver.find_element(By.ID, "online-dictionary")
        # elem.send_keys("apple")
        # elem.send_keys(Keys.RETURN)
        self.assertNotIn("No results found.", driver.page_source)
    
    def test_WOD(self):
        driver = self.driver

        #driver = webdriver.Chrome()
        time.sleep(5)
        
        driver.get("https://online-dictionary-frontend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/")
        # self.assertIn("Python", driver.title)
        elem = driver.find_element(By.XPATH, "/html/body/div[1]/main/div/div[1]/div/button/a")
        # elem.send_keys("apple")
        # elem.send_keys(Keys.RETURN)
        self.assertNotIn("No results found.", driver.page_source)
    
    def test_TOD(self):
        driver = self.driver

        #driver = webdriver.Chrome()
        time.sleep(3)
        driver.get("https://online-dictionary-frontend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/")
        # self.assertIn("Python", driver.title)
        elem = driver.find_element(By.XPATH, "/html/body/div[1]/main/div/div[2]/div/div[1]/button")
        
        # elem.send_keys("apple")
        # elem.send_keys(Keys.RETURN)
        self.assertNotIn("No results found.", driver.page_source)

    def test_search_word(self):
        driver = self.driver
        #driver = webdriver.Chrome()
        time.sleep(3)
        driver.get("https://online-dictionary-frontend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/")
        # self.assertIn("Python", driver.title)
        elem = driver.find_element(By.NAME, "word")
        elem.send_keys("apple")
        elem.send_keys(Keys.RETURN)

        self.assertNotIn("No results found.", driver.page_source)


    def tearDown(self):
        self.driver.close()

    
    

if __name__ == "__main__":
    unittest.main()
    
